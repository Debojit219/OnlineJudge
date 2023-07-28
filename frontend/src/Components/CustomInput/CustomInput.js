import React, { useState } from "react";
import styles from "./CustomInput.module.css";

const CustomInput = ({ customInput, setCustomInput }) => {
  const [customInputNeeded, setCustomInputNeeded] = useState(false);
  const handleCustomInputChange = (event) => {
    setCustomInput(event.target.value);
  };

  const handleChangeCheckbox = (event) => {
    console.log(event.target.checked);
    setCustomInputNeeded(event.target.checked);
  };
  return (
    <div id="customInputComponent">
      <label>Need Custom Input?</label>
      <input
        className={styles.CodeEditor__customInput_checkbox}
        type="checkbox"
        onChange={handleChangeCheckbox}
      />
      {customInputNeeded && (
        <>
          <h3>Custom Input:</h3>
          <textarea
            onChange={handleCustomInputChange}
            className={styles.CodeEditor__customInput}
            value={customInput}
            placeholder="Enter your custom input here..."
          />
        </>
      )}
    </div>
  );
};

export default CustomInput;
