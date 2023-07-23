import React, { useState } from "react";
import styles from "./ProblemStatement.module.css";

const ProblemStatement = (props) => {
  return (
    <div className={styles.ProblemStatement}>
      <h2>Problem Statement</h2>
      <p
        dangerouslySetInnerHTML={{ __html: props.problemStatement }}
        className={styles.ProblemStatement__text}
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
    </div>
  );
};

export default ProblemStatement;
