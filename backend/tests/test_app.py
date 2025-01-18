from fastapi.testclient import TestClient
from app.app import app

client = TestClient(app)

def test_calculate_sum():
    # Test valid input
    response = client.post("/calculate", json={"num1": 10, "num2": 20})
    assert response.status_code == 200
    assert response.json() == {"sum": 30}

    # Test with negative numbers
    response = client.post("/calculate", json={"num1": -10, "num2": 20})
    assert response.status_code == 200
    assert response.json() == {"sum": 10}

    # Test invalid input
    response = client.post("/calculate", json={"num1": "abc", "num2": 20})
    assert response.status_code == 422  # Unprocessable Entity
