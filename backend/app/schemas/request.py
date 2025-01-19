from pydantic import BaseModel, Field, field_validator
from datetime import date


class CurrencyDataRequest(BaseModel):
    baseCurrency: str = Field(..., example="DKK")
    quoteCurrency: str = Field(..., example="EUR")
    startDate: date = Field(..., example="2024-10-20")
    endDate: date = Field(..., example="2024-10-24")

    @field_validator('endDate')
    def end_date_after_start_date(cls, v, values):
        start_date = values.get('startDate')
        if start_date and v < start_date:
            raise ValueError('endDate must be after startDate')
        return v
