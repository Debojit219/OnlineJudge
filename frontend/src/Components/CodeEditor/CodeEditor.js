import React, { useState } from "react";
import styles from "./CodeEditor.module.css";

const CodeEditor = ({ onSubmit }) => {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ code, language: selectedLanguage });
    // Simulate code execution and set output (Replace this with actual execution)
    setOutput("Output will be shown here.");
  };

  return (
    <div className={styles.CodeEditor}>
      <div className={styles.CodeEditor__languageDropdown}>
        <label htmlFor="language">Select Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="c">C</option>
        </select>
      </div>
      <textarea
        className={styles.CodeEditor__textarea}
        value={code}
        onChange={handleCodeChange}
        placeholder="Enter your code here..."
      />
      <div className={styles.CodeEditor__buttons}>
        <button className={styles.CodeEditor__runButton}>Run Tests</button>
        <button
          className={styles.CodeEditor__submitButton}
          onClick={handleSubmit}
        >
          Submit Code
        </button>
      </div>
      <div className={styles.CodeEditor__output}>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
