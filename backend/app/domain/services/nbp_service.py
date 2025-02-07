import httpx
import asyncio
import logging

import numpy as np
from app.schemas.request import CurrencyDataRequest
from app.schemas.response import CurrencyDataResponse, CurrencyExchangeRateHistory
from datetime import datetime
from app.config import settings
from app.utils.helpers import calculate_statistics, generate_trend_changes_histogram

logger = logging.getLogger(__name__)

async def fetch_currency_data(request: CurrencyDataRequest) -> CurrencyDataResponse:

    # Define the cutoff date: data is available only starting from 02-01-2002.
    cutoff_date = datetime(2002, 1, 1).date()

    # Validate the request dates.
    if request.endDate == request.startDate:
        error_msg = "No overlapping dates allowed."
        logger.error(error_msg)
        raise ValueError(error_msg)
    if request.endDate >= cutoff_date >= request.startDate:
        error_msg = "No data available for given period because it includes dates before 02-01-2002."
        logger.error(error_msg)
        raise ValueError(error_msg)

    table = 'A'  # Table A is used for average daily exchange rates
    quote_specified = request.quoteCurrency and request.quoteCurrency != "PLN"

    # URLs for fetching exchange rates against PLN
    base_currency_url = f"{settings.NBP_API_URL}/exchangerates/rates/{table}/{request.baseCurrency}/{request.startDate}/{request.endDate}/"
    logger.info(f"Fetching {request.baseCurrency} rates from {base_currency_url}")
    
    quote_currency_url = ""
    if quote_specified:
        quote_currency_url = f"{settings.NBP_API_URL}/exchangerates/rates/{table}/{request.quoteCurrency}/{request.startDate}/{request.endDate}/"
        logger.info(f"Fetching {request.quoteCurrency} rates from {quote_currency_url}")


    try:
        # Fetch exchange rate data from NBP API
        async with httpx.AsyncClient() as client:
            if quote_specified:
                base_pln_response, quote_pln_response = await asyncio.gather(
                    client.get(base_currency_url, params={"format": "json"}),
                    client.get(quote_currency_url, params={"format": "json"})
                )
            else:
                base_pln_response = await client.get(base_currency_url, params={"format": "json"})

        # Handle responses
        if base_pln_response.status_code != 200:
            error_msg = f"Failed to fetch {request.baseCurrency} rates from NBP API: {base_pln_response.text}"
            logger.error(error_msg)
            raise ValueError(error_msg)
        if quote_specified and quote_pln_response.status_code != 200:
            error_msg = f"Failed to fetch {request.quoteCurrency} rates from NBP API: {quote_pln_response.text}"
            logger.error(error_msg)
            raise ValueError(error_msg)

        # Parse JSON responses
        base_data = base_pln_response.json()
        base_rates = base_data.get("rates", [])
        base_rates_map = {rate["effectiveDate"]: rate["mid"] for rate in base_rates}

        quote_rates_map = {}
        if quote_specified:
            quote_data = quote_pln_response.json()
            quote_rates = quote_data.get("rates", [])
            quote_rates_map = {rate["effectiveDate"]: rate["mid"] for rate in quote_rates} 

        # Calculate exchange rates
        exchange_rates = []
        if quote_specified:
            for date_str in base_rates_map:
                if date_str in quote_rates_map:
                    base_rate = base_rates_map[date_str]
                    quote_rate = quote_rates_map[date_str]
                    base_quote_rate = base_rate / quote_rate
                    exchange_rates.append({"date": date_str, "rate": round(base_quote_rate, 8)})
        else:
            exchange_rates = [{"date": date_str, "rate": round(base_rates_map[date_str], 8)} for date_str in base_rates_map]
        
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
        histogram = generate_trend_changes_histogram(np.diff(values))

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
