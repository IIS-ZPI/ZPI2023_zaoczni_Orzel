# tests/test_schemas.py

import pytest
from datetime import date
from app.schemas.request import CurrencyDataRequest
from pydantic import ValidationError

def test_currency_data_request_valid():
    request = CurrencyDataRequest(
        baseCurrency="DKK",
        quoteCurrency="EUR",
        startDate=date(2024, 10, 20),
        endDate=date(2024, 10, 24)
    )
    assert request.baseCurrency == "DKK"
    assert request.quoteCurrency == "EUR"
    assert request.startDate == date(2024, 10, 20)
    assert request.endDate == date(2024, 10, 24)

def test_currency_data_request_invalid_currency():
    with pytest.raises(ValidationError) as exc:
        CurrencyDataRequest(
            baseCurrency="INVALID",
            quoteCurrency="EUR",
            startDate=date(2024, 10, 20),
            endDate=date(2024, 10, 24)
        )
    assert "Invalid baseCurrency" in str(exc.value)

def test_currency_data_request_end_date_before_start_date():
    with pytest.raises(ValidationError) as exc:
        CurrencyDataRequest(
            baseCurrency="DKK",
            quoteCurrency="EUR",
            startDate=date(2024, 10, 24),
            endDate=date(2024, 10, 20)
        )
    assert "endDate must be after startDate" in str(exc.value)
