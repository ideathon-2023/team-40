import React, { useState } from "react";

const PlusMinus = ({ handleChange, type }) => {
    let [count, setCount] = useState(1);
    let disabled = false

    function incrementCount(e) {
        count = count + 1;
        setCount(count);
        handleChange(e);
    }
    function decrementCount(e) {
        if (count > 1) {
            count = count - 1;
            setCount(count);
            handleChange(e);
        }
    }
    if (count <= 1) {
        disabled = true
    }
    return (
        <div className="plus-minus">
            <button id="left" name="pages" value={count - 1} onClick={(e) => { decrementCount(e); e.preventDefault() }} disabled={disabled}>-</button>
            <input id="pages" name="pages" value={count} />
            <button id="right" name="pages" value={count + 1} onClick={(e) => { incrementCount(e); e.preventDefault() }}>+</button>
            {type === 'writing' ? <span>{275 * count} words per page</span> : <span></span>}
        </div>
    );
}

export default PlusMinus;
