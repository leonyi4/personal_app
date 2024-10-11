import React from "react";

const MedicineSelection = ({
  name,
  amount,
  selected,
  onChangeMedicine,
  onChangeAmount,
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
      {/* Medicine Checkbox */}
      <label className="flex items-center space-x-2 text-gray-700 font-semibold">
        <input
          type="checkbox"
          name={name}
          checked={selected}
          onChange={(e) => onChangeMedicine(e, name)}
          className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 
          focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition duration-150 ease-in-out"
        />
        <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
      </label>

      {/* Medicine Amount Radio Buttons */}
      <div className="flex space-x-4 text-gray-700">
        {[1, 2, 3].map((value) => (
          <label key={value} className="flex items-center space-x-2">
            <input
              type="radio"
              value={value}
              checked={amount === String(value)}
              onChange={(e) => onChangeAmount(e, name)}
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 
              focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition duration-150 ease-in-out"
            />
            <span>{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MedicineSelection;
