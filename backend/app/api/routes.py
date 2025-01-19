from fastapi import APIRouter, HTTPException
from app.schemas.request_schemas import CurrencyDataRequest
from app.schemas.response_schemas import CurrencyDataResponse
from app.services.nbp_service import fetch_currency_data

router = APIRouter(
    prefix="/currency",
    tags=["Currency Exchange"]
)

@router.post("/exchange-rate", response_model=CurrencyDataResponse)
async def get_currency_exchange_data(request: CurrencyDataRequest):
    try:
        data = await fetch_currency_data(request)
        return data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
