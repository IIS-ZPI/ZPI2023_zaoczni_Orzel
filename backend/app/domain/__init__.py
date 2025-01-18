from typing import List, Optional
from datetime import date
from app.data.models import ExchangeRate, GoldPrice

class ExchangeRateRepository:
    def get_exchange_rates(self, table: str = "A") -> List[ExchangeRate]:
        """Fetch exchange rates for the given table (A, B, or C)."""
        raise NotImplementedError

    def get_exchange_rate_by_code(self, code: str, table: str = "A") -> Optional[ExchangeRate]:
        """Fetch exchange rate for a specific currency code."""
        raise NotImplementedError

class GoldPriceRepository:
    def get_gold_prices(self, start_date: date, end_date: date) -> List[GoldPrice]:
        """Fetch historical gold prices between the given dates."""
        raise NotImplementedError