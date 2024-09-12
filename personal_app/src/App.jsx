import './App.css'
import React, { useState } from "react";

function App() {

  const [medicine, setMedicine] = useState("")
  const [amount, setAmount] = useState("")
  //const [paracetamol, setParacetamol] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Medicine: ${medicine}, Amount: ${amount}`);
  };

  return (
    <>
      <div>
        <h1>Personal Planner App</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <select onChange={(e) => setMedicine(e.target.value)}>
            <option value="">Select Medicine</option>
            <option value="Meloxicam">Meloxicam</option>
            <option value="Omeprazole">Omeprazole</option>
            <option value="Paracetamol">Paracetamol</option>
          </select>
          Amount:
          <label>
            <input type="radio" value="1" checked={amount === "1"} onChange={(e) => setAmount(e.target.value)}/>
            1
          </label>
          <label>
            <input
              type="radio" value="2" checked={amount === "2"} onChange={(e) => setAmount(e.target.value)} />
            2
          </label>
          <label>
            <input type="radio" value="3" checked={amount === "3"} onChange={(e) => setAmount(e.target.value)} />
            3
          </label>
        </div>
        <div>
          <select onChange={(e) => setMedicine(e.target.value)}>
            <option value="">Select Medicine</option>
            <option value="Meloxicam">Meloxicam</option>
            <option value="Omeprazole">Omeprazole</option>
            <option value="Paracetamol">Paracetamol</option>
          </select>
          Amount:
          <label>
            <input type="radio" value="1" checked={amount === "1"} onChange={(e) => setAmount(e.target.value)}/>
            1
          </label>
          <label>
            <input
              type="radio" value="2" checked={amount === "2"} onChange={(e) => setAmount(e.target.value)} />
            2
          </label>
          <label>
            <input type="radio" value="3" checked={amount === "3"} onChange={(e) => setAmount(e.target.value)} />
            3
          </label>
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default App
