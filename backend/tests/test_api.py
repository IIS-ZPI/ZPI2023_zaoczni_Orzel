# tests/test_api.py

import pytest
from fastapi.testclient import TestClient
from app.app import app
from app.domain.services.nbp_service import fetch_currency_data
from app.schemas.response import CurrencyDataResponse
from unittest.mock import AsyncMock, patch
from datetime import date

client = TestClient(app)

@pytest.mark.asyncio
async def test_get_currency_exchange_data_success():
    request_payload = {
        "baseCurrency": "DKK",
        "quoteCurrency": "EUR",
        "startDate": "2024-10-20",
        "endDate": "2024-10-24"
    }

    mock_dkk_response = {
        "rates": [
            {"effectiveDate": "2024-10-20", "mid": 4.5},
            {"effectiveDate": "2024-10-21", "mid": 4.43},
            {"effectiveDate": "2024-10-22", "mid": 4.4},
            {"effectiveDate": "2024-10-23", "mid": 4.5},
            {"effectiveDate": "2024-10-24", "mid": 4.52}
        ],
        "table": "A",
        "currency": "Danish Krone",
        "code": "DKK"
    }

    mock_eur_response = {
        "rates": [
            {"effectiveDate": "2024-10-20", "mid": 4.0},
            {"effectiveDate": "2024-10-21", "mid": 4.0},
            {"effectiveDate": "2024-10-22", "mid": 4.0},
            {"effectiveDate": "2024-10-23", "mid": 4.0},
            {"effectiveDate": "2024-10-24", "mid": 4.0}
        ],
        "table": "A",
        "currency": "Euro",
        "code": "EUR"
    }

    with patch("app.domain.services.nbp_service.httpx.AsyncClient.get") as mock_get:
        mock_get.side_effect = [
            AsyncMock(status_code=200, json=AsyncMock(return_value=mock_dkk_response)),
            AsyncMock(status_code=200, json=AsyncMock(return_value=mock_eur_response))
        ]

        with patch("app.domain.services.nbp_service.fetch_currency_data", new_callable=AsyncMock) as mock_service:
            mock_service.return_value = CurrencyDataResponse(
                baseCurrency="DKK",
                quoteCurrency="EUR",
                startDate="2024-10-20",
                endDate="2024-10-24",
                trendChangesHistogram=None,  # Populate as needed
                currencyExchangeRateHistory=None,  # Populate as needed
                statistics=None  # Populate as needed
            )

            response = client.post("/currency/exchange-rate", json=request_payload)
            assert response.status_code == 200
            # Further assertions based on response.json()

def test_get_currency_exchange_data_invalid_currency():
    request_payload = {
        "baseCurrency": "INVALID",
        "quoteCurrency": "EUR",
        "startDate": "2024-10-20",
        "endDate": "2024-10-24"
    }

    response = client.post("/currency/exchange-rate", json=request_payload)
    assert response.status_code == 400
    assert "Invalid baseCurrency" in response.json()["detail"]

def test_get_currency_exchange_data_end_date_before_start_date():
    request_payload = {
        "baseCurrency": "DKK",
        "quoteCurrency": "EUR",
        "startDate": "2024-10-24",
        "endDate": "2024-10-20"
    }

    response = client.post("/currency/exchange-rate", json=request_payload)
    assert response.status_code == 400
    assert "endDate must be after startDate" in response.json()["detail"]
