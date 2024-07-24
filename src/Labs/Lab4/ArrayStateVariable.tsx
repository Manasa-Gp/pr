import React, { useState } from "react";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables" className="container mt-4">
      <h2>Array State Variable</h2>
      <button className="btn btn-success text-white mb-3" onClick={addElement}>
        Add Element
      </button>
      <div className="card">
        <ul className="list-group list-group-flush">
          {array.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item}</span>
              <button className="btn btn-danger text-white" onClick={() => deleteElement(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <hr/>
    </div>
  );
}
