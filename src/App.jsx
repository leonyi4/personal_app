import './App.css'
import React, { useState } from "react";

function App() {

  // const [medicine, setMedicine] = useState("")
  // const [amount, setAmount] = useState("")
  //const [paracetamol, setParacetamol] = useState("")

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert(`Medicine: ${medicine}, Amount: ${amount}`);
  // };

  const [medicines, setMedicines] = useState({
    meloxicam: { selected: false, amount: "" },
    omeprazole: { selected: false, amount: "" },
    paracetamol: { selected: false, amount: "" }
  })

  const [otherMedicine, setOtherMedicine] = useState({ selected: false, name: "", amount: "" });

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

  const handleOtherMedicineCheckbox = (e) => {
    const { checked } = e.target;
    setOtherMedicine({ ...otherMedicine, selected: checked });
  };

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

  const handleOtherMedicineAmountChange = (e) => {
    console.log(otherMedicine.name)
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

    // Filter Selected Medicines
    const selectedMedicines = Object.keys(medicines).filter((key) => medicines[key].selected)

    // Check and add if "other" medicines are added
    const medicineAmounts = selectedMedicines.map(med => `${med}: ${medicines[med].amount}`)

    if (otherMedicine.selected && otherMedicine.name && otherMedicine.amount !== "0") {
      medicineAmounts.push(`${otherMedicine.name}: ${otherMedicine.amount}`);
    }


    alert(`Medicines and amounts: ${medicineAmounts.join(", ")}`);
  }

  return (
    <>
      <div>
        <h1>Personal Planner App</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input type='checkbox' name='meloxicam' checked={medicines.meloxicam.selected} onChange={(e) => handleMedicineChange(e, "meloxicam")} />
            Meloxicam
          </label>
          <label>
            <input type="radio" value="1" checked={medicines.meloxicam.amount === "1"} onChange={(e) => handleAmountChange(e, "meloxicam")} />
            1
          </label>
          <label>
            <input
              type="radio" value="2" checked={medicines.meloxicam.amount === "2"} onChange={(e) => handleAmountChange(e, "meloxicam")} />
            2
          </label>
          <label>
            <input type="radio" value="3" checked={medicines.meloxicam.amount === "3"} onChange={(e) => handleAmountChange(e, "meloxicam")} />
            3
          </label>
        </div>
        <div>
          <label>
            <input type='checkbox' name='omeprazole' checked={medicines.omeprazole.selected} onChange={(e) => handleMedicineChange(e, "omeprazole")} />
            Omeprazole
          </label>
          <label>
            <input type="radio" value="1" checked={medicines.omeprazole.amount === "1"} onChange={(e) => handleAmountChange(e, "omeprazole")} />
            1
          </label>
          <label>
            <input
              type="radio" value="2" checked={medicines.omeprazole.amount === "2"} onChange={(e) => handleAmountChange(e, "omeprazole")} />
            2
          </label>
          <label>
            <input type="radio" value="3" checked={medicines.omeprazole.amount === "3"} onChange={(e) => handleAmountChange(e, "omeprazole")} />
            3
          </label>
        </div>
        <div>
          <label>
            <input type='checkbox' name='paracetamol' checked={medicines.paracetamol.selected} onChange={(e) => handleMedicineChange(e, "paracetamol")} />
            Paracetamol
          </label>
          <label>
            <input type="radio" value="1" checked={medicines.paracetamol.amount === "1"} onChange={(e) => handleAmountChange(e, "paracetamol")} />
            1
          </label>
          <label>
            <input
              type="radio" value="2" checked={medicines.paracetamol.amount === "2"} onChange={(e) => handleAmountChange(e, "paracetamol")} />
            2
          </label>
          <label>
            <input type="radio" value="3" checked={medicines.paracetamol.amount === "3"} onChange={(e) => handleAmountChange(e, "paracetamol")} />
            3
          </label>
        </div>
        <div>
          <label>
            <input type='checkbox' checked={otherMedicine.selected} onChange={handleOtherMedicineCheckbox} />
            Other
          </label>
          {otherMedicine.selected && (
            <div>
              <input type='text' placeholder='Enter medicine name' value={otherMedicine.name} onChange={handleOtherMedicineChange} name='name' />
              <label>
                <input type="radio" value="1" checked={otherMedicine.amount === "1"} onChange={handleOtherMedicineAmountChange} />
                1
              </label>
              <label>
                <input
                  type="radio" value="2" checked={otherMedicine.amount === "2"} onChange={handleOtherMedicineAmountChange} />
                2
              </label>
              <label>
                <input type="radio" value="3" checked={otherMedicine.amount === "3"} onChange={handleOtherMedicineAmountChange} />
                3
              </label>
            </div>
          )}
        </div>
        <button type='submit'>Submit</button>
      </form>

    </>
  )
}

export default App
