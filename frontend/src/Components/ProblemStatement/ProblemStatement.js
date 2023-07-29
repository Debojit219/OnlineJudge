import React, { useState } from "react";
import styles from "./ProblemStatement.module.css";

const ProblemStatement = (props) => {
  const [showSolution, setShowSolution] = useState(false);

  const handleShowSolution = () => {
    setShowSolution(true);
  };

  const handleHideSolution = () => {
    setShowSolution(false);
  };

  const problemTextClass = `${styles.ProblemStatement__text} ${
    showSolution ? styles.ProblemStatement__solutionShown : ""
  }`;

  const solutionClass = `${styles.ProblemStatement__solution} ${
    !showSolution ? styles.ProblemStatement__solutionHidden : ""
  }`;

  return (
    <div className={styles.ProblemStatement}>
      <h2>Problem Statement</h2>
      <p
        dangerouslySetInnerHTML={{ __html: props.problemStatement }}
        className={problemTextClass}
      ></p>

      <h3>Example Input/Output</h3>
      <p
        dangerouslySetInnerHTML={{ __html: props.inputoutput }}
        className={styles.ProblemStatement__example}
      ></p>

      <h3>Constraints</h3>
      <p
        dangerouslySetInnerHTML={{ __html: props.constraints }}
        className={styles.ProblemStatement__constraints}
      ></p>

      <h3>Explanation</h3>
      <p
        dangerouslySetInnerHTML={{ __html: props.explanation }}
        className={styles.ProblemStatement__explanation}
      ></p>

      <button
        onClick={handleShowSolution}
        className={styles.showSolutionButton}
      >
        Show Solution
      </button>

      {showSolution && (
        <div className={solutionClass}>
          <h3>Solution</h3>
          <p>Here is the solution to the problem in C++...</p>
          <pre>{props.solution}</pre>
          <button onClick={handleHideSolution}>Hide Solution</button>
        </div>
      )}
    </div>
  );
};

export default ProblemStatement;
