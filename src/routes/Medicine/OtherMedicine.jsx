import React from "react";

const OtherMedicine = ({
  selected,
  name,
  amount,
  onCheckboxChange,
  onNameChange,
  onOtherAmountChange,
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
      {/* Other Medicine Checkbox */}
      <label className="flex items-center space-x-2 text-gray-700 font-semibold">
        <input
          type="checkbox"
          checked={selected}
          onChange={onCheckboxChange}
          className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <span>Other</span>
      </label>

      {selected && (
        <div className="flex items-center space-x-4 ml-4">
          {/* Input for Other Medicine Name */}
          <input
            type="text"
            placeholder="Enter medicine name"
            value={name}
            onChange={onNameChange}
            name="name"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Radio Buttons for Amount */}
          <div className="flex space-x-4 text-gray-700">
            {[1, 2, 3].map((value) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={value}
                  checked={amount === String(value)}
                  onChange={onOtherAmountChange}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherMedicine;
