import "./App.css";
import React, { useState } from "react";
import MedicineSelection from "./MedicineSelection";
import OtherMedicine from "./OtherMedicine";

function App() {
  const [medicines, setMedicines] = useState({
    meloxicam: { selected: false, amount: "" },
    omeprazole: { selected: false, amount: "" },
    paracetamol: { selected: false, amount: "" },
  });

  const [otherMedicine, setOtherMedicine] = useState({
    selected: false,
    name: "",
    amount: "",
  });

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const [medicineDate, setMedicineDate] = useState(getTodayDate);

  //handle changes in medicine selection
  const handleMedicineChange = (e) => {
    const { name, checked } = e.target;
    setMedicines({
      ...medicines,
      [name]: {
        ...medicines[name],
        selected: checked,
        amount: checked ? medicines[name].amount : "",
      },
    });
  };

  //handle changes in medicine amount
  const handleAmountChange = (e, medicineName) => {
    if (!medicines[medicineName].selected) {
      return;
    }

    const { value } = e.target;
    setMedicines({
      ...medicines,
      [medicineName]: {
        ...medicines[medicineName],
        amount: value,
      },
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
      return;
    }
    const { value } = e.target;
    setOtherMedicine({
      ...otherMedicine,
      amount: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAnyMedicineSelected = Object.keys(medicines).some(
      (key) => medicines[key].selected
    );

    const isOtherMedicineValid = otherMedicine.selected && otherMedicine.name;

    if (!isAnyMedicineSelected && !isOtherMedicineValid) {
      alert("Enter at least one medicine!");
      return;
    }

    // Filter Selected Medicines
    const selectedMedicines = Object.keys(medicines).filter(
      (key) => medicines[key].selected
    );

    // Check and add if "other" medicines are added
    const medicineAmounts = selectedMedicines.map(
      (med) => `${med}: ${medicines[med].amount}`
    );

    if (
      otherMedicine.selected &&
      otherMedicine.name &&
      otherMedicine.amount !== "0"
    ) {
      medicineAmounts.push(`${otherMedicine.name}: ${otherMedicine.amount}`);
    }

    alert(
      `Medicines and amounts: ${medicineAmounts.join(
        ", "
      )}, submited on date: ${medicineDate}`
    );
  };

  // Spendings
  const [spendingType, setSpendingType] = useState("");
  const [spendingAmount, setSpendingAmount] = useState("");
  const [spendingList, setSpendingList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleSpendingTypeChange = (e) => {
    setSpendingType(e.target.value);
  };
  const handleSpendingAmountChange = (e) => {
    setSpendingAmount(e.target.value);
  };

  const handleAddSpending = (e) => {
    e.preventDefault();

    if (spendingType && spendingAmount) {
      const newSpending = {
        type: spendingType,
        amount: spendingAmount,
      };

      if (editingIndex === -1) {
        setSpendingList([...spendingList, newSpending]);
      } else {
        const updateSpendingList = [...spendingList];
        updateSpendingList[editingIndex] = newSpending;
        setSpendingList(updateSpendingList);
        setEditingIndex(-1);
      }

      //reset
      setSpendingType("");
      setSpendingAmount("");
    } else {
      alert("Select a spending type and enter the amount");
    }
  };

  const handleEditSpending = (index) => {
    const spendingToEdit = spendingList[index];
    setSpendingType(spendingToEdit.type);
    setSpendingAmount(spendingToEdit.amount);
    setEditingIndex(index);
  };

  const handleRemoveSpending = (index) => {
    const updateSpendingList = spendingList.filter((_, i) => i !== index);
    setSpendingList(updateSpendingList);
  };

  const hanldeSubmitSpending = (e) => {
    e.preventDefault();
    if (spendingList) {
      // Handle the final form submission logic here
      console.log("Final spending list:", spendingList);
      alert(`Spending data submitted: ${JSON.stringify(spendingList)}`);

      setSpendingList([])

      setSpendingAmount("")
      setSpendingType("")
      setEditingIndex(-1)
    } else {
      alert("No spending added!s");
    }
  };

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
          <input
            type="date"
            name="medicineDate"
            value={medicineDate}
            onChange={(e) => setMedicineDate(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h2>Budget</h2>
        <label>Enter Spendings</label>
        <form onSubmit={hanldeSubmitSpending}>
          <select
            name="spendingType"
            value={spendingType}
            onChange={handleSpendingTypeChange}
          >
            <option value="">Select Type</option>
            <option value="food">Food</option>
            <option value="shopping">Shopping</option>
            <option value="groceries">groceries</option>
            <option value="transportation">Transportation</option>
            <option value="education">Education</option>
            <option value="bills">Bills</option>
            <option value="family">Family</option>
          </select>
          <input
            type="number"
            name="spendingAmount"
            value={spendingAmount}
            placeholder="Thb"
            onChange={handleSpendingAmountChange}
          />
          <button type="button" onClick={handleAddSpending}>
            {editingIndex === -1 ? "Add" : "Update"}
          </button>
          <button type="reset">Cancel</button>

          <button type='submit'>Submit</button>
        </form>

        <h3>Spending List</h3>
        <ul>
          {spendingList.map((spending, index) => (
            <li key={index}>
              {spending.type}: {spending.amount}
              <button onClick={() =>handleEditSpending(index)}>Edit</button>
              <button onClick={() => handleRemoveSpending(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
