import httpx
from app.config import settings


async def fetch_from_api(endpoint: str):
    """Fetch data from the external bank API."""
    url = f"{settings.bank_api_base_url}{endpoint}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers={"Authorization": f"Bearer {settings.bank_api_key}"})
        response.raise_for_status()  # Raise HTTP errors if they occur
        return response.json()
