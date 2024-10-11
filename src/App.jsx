import React, { useState } from "react";
import Spendings from "./routes/Spendings/Spendings";
import Medicines from "./routes/Medicine/Medicines";
import Nav from "./Components/Nav";
import { Outlet } from "react-router-dom";

function App() {

  const handleMedicineSubmit = (mData) => {
    console.log("Medicnes", mData);
  };
  const handleSpendingSubmit = (sData) => {
    console.log("spendings", sData);
  };

  return (
    <div>
      <Nav/>
      <main>
        <Outlet/>

      </main>
      
    </div>
  );
}

export default App;
