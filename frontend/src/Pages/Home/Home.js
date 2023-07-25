import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Home.module.css";

const Home = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Fetch the list of problems from the backend API
    axios.get("http://localhost:8000/api/problems/getall").then((response) => {
      setProblems(response.data);
    });
  }, []);

  return (
    <div className={styles.Home}>
      <h1>Welcome to the Problem List</h1>
      <ul className={styles.ProblemList}>
        {problems.map((problem, index) => (
          <li
            key={problem.problemId}
            className={index % 2 === 0 ? styles.EvenRow : styles.OddRow}
          >
            <Link to={`/problem/${problem.problemId}`} className={styles.Link}>
              <h2>{problem.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
