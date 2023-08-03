import React from "react";

function Input({value,change}) {
    return (
      <>
      <div className="search__container">

    <input
        type='text'
        className="search__input"
        placeholder="Введіть рипозиторій"
        value={value}
        onChange={change}
        />
    {/* <input class="search__input" type="text" placeholder="Search"> */}
      </div>


       
       </>
    )
}

export default Input