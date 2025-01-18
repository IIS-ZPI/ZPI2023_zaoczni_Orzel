from fastapi import APIRouter, HTTPException, Depends
from app.models.request_models import DateRangeRequest
from app.models.response_models import AggregatedDataResponse
from app.services.bank_service import get_bank_data, aggregate_data

router = APIRouter(prefix="/bank", tags=["Bank"])

@router.post("/aggregated", response_model=AggregatedDataResponse)
async def fetch_and_aggregate(request: DateRangeRequest):
    """Fetch and aggregate data from the bank API."""
    try:
        raw_data = await get_bank_data(request.start_date, request.end_date)
        aggregated_data = aggregate_data(raw_data)
        return {"currency": "USD", "average_rate": aggregated_data, "data": raw_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
