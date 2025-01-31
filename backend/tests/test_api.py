# tests/test_api.py

import pytest
from fastapi.testclient import TestClient
from app.app import app
from app.domain.services.nbp_service import CurrencyExchangeRateHistory, Statistics, TrendChangesHistogram, fetch_currency_data
from app.schemas.response import CurrencyDataResponse
from unittest.mock import AsyncMock, Mock, patch
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
            {"effectiveDate": "2024-10-20", "mid": 0.5},
            {"effectiveDate": "2024-10-21", "mid": 0.6},
            {"effectiveDate": "2024-10-22", "mid": 0.6},
            {"effectiveDate": "2024-10-23", "mid": 0.5},
            {"effectiveDate": "2024-10-24", "mid": 0.55}
        ],
        "table": "A",
        "currency": "Danish Krone",
        "code": "DKK"
    }

    mock_eur_response = {
        "rates": [
            {"effectiveDate": "2024-10-20", "mid": 4.0},
            {"effectiveDate": "2024-10-21", "mid": 4.1},
            {"effectiveDate": "2024-10-22", "mid": 4.2},
            {"effectiveDate": "2024-10-23", "mid": 4.1},
            {"effectiveDate": "2024-10-24", "mid": 4.0}
        ],
        "table": "A",
        "currency": "Euro",
        "code": "EUR"
    }

    base_response_mock = AsyncMock(status_code=200)
    base_response_mock.json = Mock(return_value=mock_dkk_response)

    quote_response_mock = AsyncMock(status_code=200)
    quote_response_mock.json = Mock(return_value=mock_eur_response)


    with patch("app.domain.services.nbp_service.httpx.AsyncClient.get") as mock_get:
        mock_get.side_effect = [base_response_mock, quote_response_mock]


        with patch("app.domain.services.nbp_service.fetch_currency_data", new_callable=AsyncMock) as mock_service:
            mock_service.return_value = CurrencyDataResponse(
                baseCurrency="DKK",
                quoteCurrency="EUR",
                startDate="2024-10-20",
                endDate="2024-10-24",
                trendChangesHistogram=TrendChangesHistogram(
                    values=[0, 2, 3, 2, 0], 
                    labels=[-1, -0.5, -0.2, 0.2, 0.5, 1]
                ),
                currencyExchangeRateHistory=CurrencyExchangeRateHistory(
                    values=[4.5, 4.43, 4.4, 4.5, 4.52],
                    labels=["20-10-2024", "21-10-2024", "22-10-2024", "23-10-2024", "24-10-2024"]
                ),
                statistics=Statistics(
                    increasingTrend= 2,
                    decreasingTrend= 2,
                    stableTrends= 0,
                    median= 4.4321,
                    coeffOfVariation= 0.031,
                    standardDeviation= 0.0136,
                    dominant= [1.1, 1.2]
                )
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
    assert response.status_code == 422
    assert "INVALID is not a valid currency code" in response.json()["detail"][0]["msg"]

def test_get_currency_exchange_data_end_date_before_start_date():
    request_payload = {
        "baseCurrency": "DKK",
        "quoteCurrency": "EUR",
        "startDate": "2024-10-24",
        "endDate": "2024-10-20"
    }

    response = client.post("/currency/exchange-rate", json=request_payload)
    assert response.status_code == 422
    assert "endDate must be after startDate" in response.json()["detail"][0]["msg"]
