import React, { useState } from "react";
import axios from "axios";
import styles from "./CodeEditor.module.css";

const CodeEditor = ({ problemId }) => {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(62);
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verdict, setVerdict] = useState("");

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleCustomInputChange = (event) => {
    setCustomInput(event.target.value);
  };

  const handleSubmit = async () => {
    const payload = {
      sourceCode: code,
      languageId: selectedLanguage,
      problemId: problemId,
    };
    console.log(payload);

    try {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_PORT}api/compile/judge0/submit`,
          payload
        )
        .then((response) => {
          console.log("Problem details fetched successfully:", response.data);
          console.log(atob(response.data.stdout));
          setVerdict(response.data.status.description);
        });
    } catch (error) {
      console.error("Error fetching problem details:", error);
    }
  };

  const handleRunTest = async () => {
    const payload = {
      sourceCode: code,
      languageId: selectedLanguage,
      customInput: customInput,
    };
    console.log(payload);

    try {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_PORT}api/compile/judge0/runtest`,
          payload
        )
        .then((response) => {
          console.log("Problem details fetched successfully:", response.data);
          setErrorMessage(
            atob(response.data.stderr == null ? "" : response.data.stderr)
          );
          console.log(atob(response.data.stdout));
          setOutput(
            atob(response.data.stdout == null ? "" : response.data.stdout)
          );
        });
    } catch (error) {
      console.error("Error fetching problem details:", error);
    }
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
          <option value="62">Java</option>
          <option value="54">C++</option>
          <option value="71">Python</option>
          <option value="63">JavaScript</option>
          <option value="54">C</option>
        </select>
      </div>
      <textarea
        className={styles.CodeEditor__textarea}
        value={code}
        onChange={handleCodeChange}
        placeholder="Enter your code here..."
      />
      <div className={styles.CodeEditor__buttons}>
        <button
          className={styles.CodeEditor__runButton}
          onClick={handleRunTest}
        >
          Run Tests
        </button>
        <button
          className={styles.CodeEditor__submitButton}
          onClick={handleSubmit}
        >
          Submit Code
        </button>
      </div>
      <h3>Custom Input:</h3>
      <textarea
        onChange={handleCustomInputChange}
        className={styles.CodeEditor__customInput}
        value={customInput}
        placeholder="Enter your custom input here..."
      />
      <div className={styles.CodeEditor__output}>
        <h3>Output:</h3>
        <pre>{errorMessage}</pre>
        <pre>{output}</pre>
      </div>
      <div className={styles.CodeEditor__verdict}>
        <h3>Verdict</h3>
        <pre className={styles[verdict]}>{verdict}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
