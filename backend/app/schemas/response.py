from pydantic import BaseModel, Field
from typing import List, Optional


class TrendChangesHistogram(BaseModel):
    values: List[int] = Field(..., example=[0, 2, 3, 2, 0])
    labels: List[float] = Field(..., example=[-1, -0.5, -0.2, 0.2, 0.5, 1])


class CurrencyExchangeRateHistory(BaseModel):
    values: List[float] = Field(..., example=[4.5, 4.43, 4.4, 4.5, 4.52])
    labels: List[str] = Field(..., example=["20-10-2024", "21-10-2024", "22-10-2024", "23-10-2024", "24-10-2024"])


class Statistics(BaseModel):
    increasingTrend: int = Field(..., example=2)
    decreasingTrend: int = Field(..., example=2)
    stableTrends: int = Field(..., example=0)
    median: float = Field(..., example=4.4321)
    coeffOfVariation: float = Field(..., example=0.031)
    standardDeviation: float = Field(..., example=0.0136)
    dominant: Optional[str] = Field(None, example=None)


class CurrencyDataResponse(BaseModel):
    baseCurrency: str = Field(..., example="DKK")
    quoteCurrency: str = Field(..., example="EUR")
    startDate: str = Field(..., example="2024-10-20")
    endDate: str = Field(..., example="2024-10-24")
    trendChangesHistogram: TrendChangesHistogram
    currencyExchangeRateHistory: CurrencyExchangeRateHistory
    statistics: Statistics
