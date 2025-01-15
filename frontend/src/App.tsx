import { useState } from 'react'
import './App.css'
import { calculateSum } from './api/sumApi';

function App() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    try {
      const response = await calculateSum(parseFloat(num1), parseFloat(num2));
      setResult(response.data.sum);
      setError(null);
    } catch (err) {
      setError("Error calculating sum. Please try again.");
      setResult(null);
    }
  };
  
  return (
    <>
      <h1>Sum Calculator</h1>
      <div className="card">
      <div>
        <input
          type="number"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <h2>Result: {result}</h2>}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
    </div>
    </>
  )
}

export default App
