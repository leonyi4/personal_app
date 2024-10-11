import React from 'react'

const OtherMedicine = ({selected,name,amount,onCheckboxChange,onNameChange,onOtherAmountChange}) => {
  return (
    <div>
          <label>
            <input type='checkbox' checked={selected} onChange={onCheckboxChange} />
            Other
          </label>
          {selected && (
            <div>
              <input type='text' placeholder='Enter medicine name' value={name} onChange={onNameChange} name='name' />
              <label>
                <input type="radio" value="1" checked={amount === "1"} onChange={onOtherAmountChange} />
                1
              </label>
              <label>
                <input
                  type="radio" value="2" checked={amount === "2"} onChange={onOtherAmountChange} />
                2
              </label>
              <label>   
                <input type="radio" value="3" checked={amount === "3"} onChange={onOtherAmountChange} />
                3
              </label>
            </div>
          )}
        </div>
  )
}

export default OtherMedicine