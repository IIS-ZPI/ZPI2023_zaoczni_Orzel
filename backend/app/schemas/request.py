from pydantic import BaseModel, Field, model_validator
from datetime import date
import pycountry

def is_valid_currency(code: str) -> bool:
    return code in [currency.alpha_3 for currency in pycountry.currencies]


class CurrencyDataRequest(BaseModel):
    baseCurrency: str = Field(..., example="DKK")
    quoteCurrency: str = Field(..., example="EUR")
    startDate: date = Field(..., example="2024-10-20")
    endDate: date = Field(..., example="2024-10-24")
    
    @model_validator(mode='after')
    def validate_fields(cls, model):
        if not is_valid_currency(model.baseCurrency):
            raise ValueError(f"{model.baseCurrency} is not a valid currency code")
        if not is_valid_currency(model.quoteCurrency):
            raise ValueError(f"{model.quoteCurrency} is not a valid currency code")
        if model.endDate < model.startDate:
            raise ValueError("endDate must be after startDate")
        return model
