import React from "react";

function Button ({triger}) {
    return (
        <div className="search-button-wrap">
        <button 
        className="search-button"
        onClick={triger}
        >Search</button>
        </div>
    )
}

export default Button