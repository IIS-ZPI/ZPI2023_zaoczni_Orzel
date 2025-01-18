from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.bank_routes import router
from contextlib import asynccontextmanager
from app.repository.main import init_repository
@asynccontextmanager
async def life_span(app:FastAPI):
    print(f"server is starting ... ")
    await init_repository()
    yield
    print(f"server has been stopped")

version = "v1"

app = FastAPI(
    title="Bank Data Aggregator",
    description="Fetches and aggregates data from the national bank API",
    version=version,
    lifespan=life_span
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routes
app.include_router(router, prefix=f"/api/{version}/books", tags=['boks'])