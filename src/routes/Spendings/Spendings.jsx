import React, { useState } from "react";

const Spendings = (props) => {
  const [spendingType, setSpendingType] = useState("");
  const [spendingAmount, setSpendingAmount] = useState("");
  const [spendingList, setSpendingList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1); // For editing spendings

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [spendingDate, setSpendingDate] = useState(getTodayDate);

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
        acc[type] = amount; // Assign amount to the type key
        return acc; // Return the updated accumulator
      }, {}); // Start with an empty object

      const finalSpendingData = {
        ...spendingData, // Spread existing medicine and amounts into new object
        date: spendingDate, // Add date as a new property
      };

      props.onSubmit(finalSpendingData); // sends the data to app.jsx

      setSpendingList([]);

      setSpendingAmount("");
      setSpendingType("");
      setEditingIndex(-1);
    } else {
      alert("No spending added!s");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="font-bold text-3xl text-gray-800 mb-6 text-center">
        Budget
      </h2>
      <form onSubmit={hanldeSubmitSpending} className="space-y-6">
        {/* Spending Type */}
        <select
          name="spendingType"
          value={spendingType}
          onChange={handleSpendingTypeChange}
          className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Spending Amount */}
        <input
          type="number"
          name="spendingAmount"
          value={spendingAmount}
          placeholder="Thb"
          onChange={handleSpendingAmountChange}
          min="0"
          className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/*Date Selection */}
        <div className="flex flex-col space-y-3">
          <label className="font-semi-bold text-gray-700">Select Date</label>
          <input
            type="date"
            name="spendingDate"
            value={spendingDate}
            onChange={(e) => setSpendingDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Buttons for Adding and Submitting Spendings */}
        <div className="flex justify-center space-x-3">
          <button
            type="button"
            onClick={handleAddSpending}
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow 
            hover:bg-green-600 transition duration-300 ease-in-out"
          >
            {editingIndex === -1 ? "Add" : "Update"}
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow 
            hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Submit
          </button>
          <button
            type="reset"
            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow 
            hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>

      <h3 className="font-bold text-xl text-gray-800 mt-8">Spending List</h3>
      <ul className="space-y-2">
        {spendingList.map((spending, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
          >
            <span>{spending.type}: {spending.amount}</span>
            <div className="flex justify-center space-x-2">
              <button
                className="bg-blue-500 text-white py-1 px-2 rounded-lg shadow 
            hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={() => handleEditSpending(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-1 px-2 rounded-md shadow 
            hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={() => handleRemoveSpending(index)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Spendings;
