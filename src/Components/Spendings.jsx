import React, { useState } from "react";

const Spendings = (props) => {
  const [spendingType, setSpendingType] = useState("");
  const [spendingAmount, setSpendingAmount] = useState("");
  const [spendingList, setSpendingList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1); // For editing spendings

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

      // if new, add to list. if old, change the inputs to the selected spending
      if (editingIndex === -1) {
        setSpendingList([...spendingList, newSpending]); //old list + new input
      } else {
        const updateSpendingList = [...spendingList]; //copy old list
        updateSpendingList[editingIndex] = newSpending; //add new spending in the index of old spending in the updated list
        setSpendingList(updateSpendingList); // set the updated list as current spending list
        setEditingIndex(-1); // reset index
      }

      //reset
      setSpendingType("");
      setSpendingAmount("");
    } else {
      if (!spendingType) {
        alert("select a spending type");
      } else if (!spendingAmount) {
        alert("enter the spending amount");
      } else {
        alert("Select a spending type and enter the amount");
      }
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


      const spendingData = spendingList.reduce((acc, { type, amount }) => {
        acc[type] = amount;  // Assign amount to the type key
        return acc;  // Return the updated accumulator
      }, {});  // Start with an empty object


      props.onSubmit(spendingData); // sends the data to app.jsx

      
      setSpendingList([]);

      setSpendingAmount("");
      setSpendingType("");
      setEditingIndex(-1);
    } else {
      alert("No spending added!s");
    }
  };

  return (
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
          min="0"
        />
        <button type="button" onClick={handleAddSpending}>
          {editingIndex === -1 ? "Add" : "Update"}
        </button>
        <button type="reset">Cancel</button>

        <button type="submit">Submit</button>
      </form>

      <h3>Spending List</h3>
      <ul>
        {spendingList.map((spending, index) => (
          <li key={index}>
            {spending.type}: {spending.amount}
            <button onClick={() => handleEditSpending(index)}>Edit</button>
            <button onClick={() => handleRemoveSpending(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Spendings;
