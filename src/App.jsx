import "./App.css";
import React, { useState } from "react";
import MedicineSelection from "./Components/MedicineSelection";
import OtherMedicine from "./Components/OtherMedicine";
import Spendings from "./Components/Spendings";
import Medicines from "./Components/Medicines";

function App() {

  // Spendings
  const handleSpendingSubmit = (data) => {
    console.log("spendings", data);
  };

  return (
    <>
      <div>
        <h1>Personal Planner App</h1>
      </div>
      <Medicines />
      <Spendings onSubmit={handleSpendingSubmit} />
    </>
  );
}

export default App;
