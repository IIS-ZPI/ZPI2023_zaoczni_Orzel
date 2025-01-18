from app.utils.api_client import fetch_from_api


async def get_bank_data(start_date: str, end_date: str):
    """Fetch raw data from the bank's API."""
    url = f"/rates?start_date={start_date}&end_date={end_date}"
    response = await fetch_from_api(url)
    return response


def aggregate_data(raw_data):
    """Perform aggregation on raw data."""
    result = {}
    for entry in raw_data:
        currency = entry["currency"]
        rate = entry["rate"]
        if currency not in result:
            result[currency] = {"total_rate": 0, "count": 0}
        result[currency]["total_rate"] += rate
        result[currency]["count"] += 1

    # Convert aggregated data into a list
    aggregated = [
        {"currency": currency, "average_rate": round(data["total_rate"] / data["count"], 2)}
        for currency, data in result.items()
    ]
    return aggregated
