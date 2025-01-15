from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Numbers(BaseModel):
    num1: float
    num2: float

@app.post("/calculate")
def calculate_sum(numbers: Numbers):
    return {"sum": numbers.num1 + numbers.num2}
