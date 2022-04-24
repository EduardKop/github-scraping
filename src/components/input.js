import React from "react";

function Input({value,change}) {
    return (
      <>
        <input
        type='text'
        className="search-input-item"
        placeholder="Введіть рипозиторій"
        value={value}
        onChange={change}
        />
       </>
    )
}

export default Input