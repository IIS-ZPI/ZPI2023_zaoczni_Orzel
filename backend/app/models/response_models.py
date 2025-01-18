from pydantic import BaseModel
from typing import List, Dict

class AggregatedDataResponse(BaseModel):
    currency: str
    average_rate: float
    data: List[Dict[str, float]]
