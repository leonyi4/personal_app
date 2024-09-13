import './App.css'
import React, { useState } from "react";
import MedicineSelection from './MedicineSelection';
import OtherMedicine from './OtherMedicine';

function App() {

  const [medicines, setMedicines] = useState({
    meloxicam: { selected: false, amount: "" },
    omeprazole: { selected: false, amount: "" },
    paracetamol: { selected: false, amount: "" }
  })

  const [otherMedicine, setOtherMedicine] = useState({ selected: false, name: "", amount: "" });

  const getTodayDate = () =>{
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  const [medicineDate, setMedicineDate] = useState(getTodayDate)

  //handle changes in medicine selection
  const handleMedicineChange = (e) => {
    const { name, checked } = e.target
    setMedicines({
      ...medicines,
      [name]: {
        ...medicines[name],
        selected: checked,
        amount: checked ? medicines[name].amount : "",
      }
    })
  }

  //handle changes in medicine amount
  const handleAmountChange = (e, medicineName) => {

    if (!medicines[medicineName].selected) {
      return
    }

    const { value } = e.target;
    setMedicines({
      ...medicines,
      [medicineName]: {
        ...medicines[medicineName],
        amount: value
      }
    });
  };

  // handle other medicne checkbox
  const handleOtherMedicineCheckbox = (e) => {
    const { checked } = e.target;
    setOtherMedicine({ ...otherMedicine, selected: checked });
  };

  // handle changes in name of other medicine
  const handleOtherMedicineChange = (e) => {
    const { name, value } = e.target;
    setOtherMedicine((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };

      // Reset amount if the name is empty
      if (name === "name" && value === "") {
        newState.amount = "";
      }

      return newState;
    });
  };

  // Detect changes in other medicine amount
  const handleOtherMedicineAmountChange = (e) => {
    if (!otherMedicine.name) {
      return
    }
    const { value } = e.target;
    setOtherMedicine({
      ...otherMedicine,
      amount: value,
    });
  };




  const handleSubmit = (e) => {
    e.preventDefault()

    const isAnyMedicineSelected = Object.keys(medicines).some(
      (key) => medicines[key].selected
    )

    const isOtherMedicineValid = otherMedicine.selected && otherMedicine.name;

    if (!isAnyMedicineSelected && !isOtherMedicineValid) {
      alert("Enter at least one medicine!")
      return;
    }

    // Filter Selected Medicines
    const selectedMedicines = Object.keys(medicines).filter((key) => medicines[key].selected)

    // Check and add if "other" medicines are added
    const medicineAmounts = selectedMedicines.map(med => `${med}: ${medicines[med].amount}`)

    if (otherMedicine.selected && otherMedicine.name && otherMedicine.amount !== "0") {
      medicineAmounts.push(`${otherMedicine.name}: ${otherMedicine.amount}`);
    }


    alert(`Medicines and amounts: ${medicineAmounts.join(", ")}, submited on date: ${medicineDate}`);
  }

  const handleSubmit2 = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div>
        <h1>Personal Planner App</h1>
      </div>
      <div>
        <h2>Medicine</h2>
        <form onSubmit={handleSubmit}>

          {Object.keys(medicines).map((medicineName) => (
            <MedicineSelection
              key={medicineName}
              name={medicineName}
              selected={medicines[medicineName].selected}
              amount={medicines[medicineName].amount}
              onChangeMedicine={handleMedicineChange}
              onChangeAmount={handleAmountChange}
            />
          ))}
          <OtherMedicine
            selected={otherMedicine.selected}
            amount={otherMedicine.amount}
            name={otherMedicine.name}
            onCheckboxChange={handleOtherMedicineCheckbox}
            onNameChange={handleOtherMedicineChange}
            onOtherAmountChange={handleOtherMedicineAmountChange}
          />
          <input type='date' name='medicineDate' value={medicineDate} onChange={(e) => setMedicineDate(e.target.value)} />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div>
        <h2>Budget</h2>
        <form onSubmit={handleSubmit2}>
          <label>Enter Spendings</label>
        </form>
      </div>
    </>
  )
}

export default App
