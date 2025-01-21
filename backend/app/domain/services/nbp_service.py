import httpx
import asyncio
import logging
from app.schemas.request import CurrencyDataRequest
from app.schemas.response import CurrencyDataResponse, TrendChangesHistogram, CurrencyExchangeRateHistory, Statistics
from datetime import datetime
from typing import Optional
from app.config import settings
from app.utils.helpers import calculate_statistics, generate_trend_changes_histogram

logger = logging.getLogger(__name__)

async def fetch_currency_data(request: CurrencyDataRequest) -> CurrencyDataResponse:
    table = 'A'  # Adjust based on requirements

    # URLs for fetching exchange rates against PLN
    pln_to_dkk_url = f"{settings.NBP_API_URL}/exchangerates/rates/{table}/DKK/{request.startDate}/{request.endDate}/"
    pln_to_eur_url = f"{settings.NBP_API_URL}/exchangerates/rates/{table}/EUR/{request.startDate}/{request.endDate}/"

    logger.info(f"Fetching DKK rates from {pln_to_dkk_url}")
    logger.info(f"Fetching EUR rates from {pln_to_eur_url}")

    try:
        # Fetch both DKK and EUR rates concurrently
        async with httpx.AsyncClient() as client:
            pln_to_dkk_response, pln_to_eur_response = await asyncio.gather(
                client.get(pln_to_dkk_url, params={"format": "json"}),
                client.get(pln_to_eur_url, params={"format": "json"})
            )

        # Handle responses
        if pln_to_dkk_response.status_code != 200:
            error_msg = f"Failed to fetch DKK rates from NBP API: {pln_to_dkk_response.text}"
            logger.error(error_msg)
            raise ValueError(error_msg)
        if pln_to_eur_response.status_code != 200:
            error_msg = f"Failed to fetch EUR rates from NBP API: {pln_to_eur_response.text}"
            logger.error(error_msg)
            raise ValueError(error_msg)

        # Parse JSON responses
        dkk_data = pln_to_dkk_response.json()
        eur_data = pln_to_eur_response.json()

        # Extract rates
        dkk_rates = dkk_data.get("rates", [])
        eur_rates = eur_data.get("rates", [])

        if not dkk_rates or not eur_rates:
            error_msg = "Incomplete exchange rate data."
            logger.error(error_msg)
            raise ValueError(error_msg)

        # Create mappings from date to rate
        dkk_rates_map = {rate["effectiveDate"]: rate["mid"] for rate in dkk_rates}
        eur_rates_map = {rate["effectiveDate"]: rate["mid"] for rate in eur_rates}

        # Calculate DKK/EUR exchange rates
        exchange_rates = []
        for date_str in dkk_rates_map:
            if date_str in eur_rates_map:
                # DKK/EUR = (PLN/DKK) / (PLN/EUR)
                dkk_rate = dkk_rates_map[date_str]
                eur_rate = eur_rates_map[date_str]
                dkk_eur_rate = dkk_rate / eur_rate
                exchange_rates.append({
                    "date": date_str,
                    "rate": round(dkk_eur_rate, 4)  # Rounded to 4 decimal places
                })

        if not exchange_rates:
            error_msg = "No overlapping exchange rate data found for the specified dates."
            logger.error(error_msg)
            raise ValueError(error_msg)

        # Sort the exchange rates by date
        exchange_rates.sort(key=lambda x: x["date"])

        values = [rate["rate"] for rate in exchange_rates]
        labels = [datetime.strptime(rate["date"], "%Y-%m-%d").strftime("%d-%m-%Y") for rate in exchange_rates]

        currency_history = CurrencyExchangeRateHistory(values=values, labels=labels)

        # Generate trend changes histogram
        histogram = generate_trend_changes_histogram(values)

        # Calculate statistics
        stats = calculate_statistics(values)

        response = CurrencyDataResponse(
            baseCurrency=request.baseCurrency,
            quoteCurrency=request.quoteCurrency,
            startDate=request.startDate.isoformat(),
            endDate=request.endDate.isoformat(),
            trendChangesHistogram=histogram,
            currencyExchangeRateHistory=currency_history,
            statistics=stats
        )

        logger.info(f"Successfully fetched and processed exchange data for {request.baseCurrency}/{request.quoteCurrency} from {request.startDate} to {request.endDate}")

        return response

    except Exception as e:
        logger.exception(f"An error occurred while fetching currency data: {str(e)}")
        raise e
