from pydantic import BaseModel
from datetime import date

class ExchangeRate(BaseModel):
    currency: str
    code: str
    rate: float

class GoldPrice(BaseModel):
    date: date
    price: float
