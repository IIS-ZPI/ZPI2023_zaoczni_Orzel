# tests/test_services.py

import pytest
from unittest.mock import AsyncMock, patch
from app.domain.services.nbp_service import fetch_currency_data
from app.schemas.request import CurrencyDataRequest
from app.schemas.response import CurrencyDataResponse
from datetime import date
import asyncio

@pytest.mark.asyncio
async def test_fetch_currency_data_success():
    request = CurrencyDataRequest(
        baseCurrency="DKK",
        quoteCurrency="EUR",
        startDate=date(2024, 10, 20),
        endDate=date(2024, 10, 24)
    )

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

    with patch("httpx.AsyncClient.get") as mock_get:
        mock_get.side_effect = [
            AsyncMock(status_code=200, json=AsyncMock(return_value=mock_dkk_response)),
            AsyncMock(status_code=200, json=AsyncMock(return_value=mock_eur_response))
        ]

        response = await fetch_currency_data(request)

        assert isinstance(response, CurrencyDataResponse)
        assert response.baseCurrency == "DKK"
        assert response.quoteCurrency == "EUR"
        assert response.startDate == "2024-10-20"
        assert response.endDate == "2024-10-24"
        assert response.currencyExchangeRateHistory.values == [1.125, 1.1075, 1.1, 1.125, 1.13]
        assert response.currencyExchangeRateHistory.labels == [
            "20-10-2024",
            "21-10-2024",
            "22-10-2024",
            "23-10-2024",
            "24-10-2024"
        ]
        # Further assertions can be added based on histogram and statistics
