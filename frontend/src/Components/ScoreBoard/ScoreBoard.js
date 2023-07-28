import React from "react";
import styles from "./ScoreBoard.module.css";

function ScoreBoard({ totalScore }) {
  return <div className={styles.scoreboard}>Score: {totalScore}/100</div>;
}

export default ScoreBoard;
