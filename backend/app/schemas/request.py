from pydantic import BaseModel, Field, model_validator
from datetime import date


class CurrencyDataRequest(BaseModel):
    baseCurrency: str = Field(..., example="DKK")
    quoteCurrency: str = Field(..., example="EUR")
    startDate: date = Field(..., example="2024-10-20")
    endDate: date = Field(..., example="2024-10-24")

    @model_validator(mode='after')
    def check_dates(cls, model):
        """
        Validates that endDate is after startDate.
        """
        if model.endDate < model.startDate:
            raise ValueError('endDate must be after startDate')
        return model
