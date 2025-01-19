import httpx
from app.schemas.request import CurrencyDataRequest
from app.schemas.response import CurrencyDataResponse, TrendChangesHistogram, CurrencyExchangeRateHistory, Statistics
from datetime import datetime
from typing import Optional
from app.config import settings
from app.utils.helpers import calculate_statistics, generate_trend_changes_histogram


async def fetch_currency_data(request: CurrencyDataRequest) -> CurrencyDataResponse:
    # Construct the API endpoint URL based on the request
    # This is a placeholder; the actual URL structure depends on NBP's API
    url = f"{settings.NBP_API_URL}/exchange-rates/{request.baseCurrency}/{request.quoteCurrency}"
    params = {
        "start": request.startDate.isoformat(),
        "end": request.endDate.isoformat()
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        if response.status_code != 200:
            raise ValueError(f"Failed to fetch data from NBP API: {response.text}")
        api_data = response.json()

    # Process the API data to fit the response schema
    # The processing logic depends on the structure of NBP's API response
    # Below is a hypothetical processing example

    # Example: Extract exchange rates and dates
    rates = api_data.get("rates", [])
    if not rates:
        raise ValueError("No exchange rate data found.")

    values = [rate["mid"] for rate in rates]  # Assuming 'mid' is the exchange rate
    labels = [datetime.strptime(rate["effectiveDate"], "%Y-%m-%d").strftime("%d-%m-%Y") for rate in rates]

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

    return response
