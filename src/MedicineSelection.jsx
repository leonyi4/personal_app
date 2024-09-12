import React from 'react'

const MedicineSelection = ({name, amount, selected,onChangeMedicine, onChangeAmount}) => {
    return (
        <div>
            <label>
                <input type='checkbox' name={name} checked={selected} onChange={(e) => onChangeMedicine(e, name)} />
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <label>
                <input type="radio" value="1" checked={amount === "1"} onChange={(e) => onChangeAmount(e, name)} />
                1
            </label>
            <label>
                <input
                    type="radio" value="2" checked={amount === "2"} onChange={(e) => onChangeAmount(e, name)} />
                2
            </label>
            <label>
                <input type="radio" value="3" checked={amount === "3"} onChange={(e) => onChangeAmount(e, name)} />
                3
            </label>
        </div>
    )
}

export default MedicineSelection