import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProblemStatement from "../../Components/ProblemStatement/ProblemStatement";
import CodeEditor from "../../Components/CodeEditor/CodeEditor";
import ScoreBoard from "../../Components/ScoreBoard/ScoreBoard";

function Problem() {
  const [problemStatement, setProblemStatement] = useState("");
  const [constraint, setConstraint] = useState("");
  const [inputoutput, setInputoutput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [solution, setSolution] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    fetchProblemDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProblemDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_PORT}api/problems/${id}`
      );
      setProblemStatement(
        response.data.problemStatement.statement.replace(/\n/g, "<br />")
      );
      setConstraint(
        response.data.problemStatement.constraint.replace(/\n/g, "<br />")
      );
      setInputoutput(
        response.data.problemStatement.exampleInputoutput.replace(
          /\n/g,
          "<br />"
        )
      );
      setExplanation(
        response.data.problemStatement.explanation.replace(/\n/g, "<br />")
      );

      setSolution(response.data.solutionCode);

    } catch (error) {
      console.error("Error fetching problem details:", error);
    }
  };

  return (
    <>
      <ScoreBoard totalScore={totalScore} />
      <ProblemStatement
        problemStatement={problemStatement}
        constraints={constraint}
        inputoutput={inputoutput}
        explanation={explanation}
        solution={solution}
      />
      <CodeEditor
        obtainedScore={totalScore}
        setObtainedScore={setTotalScore}
        problemId={id}
        style={{ overflow: "hidden" }}
      />
    </>
  );
}

export default Problem;
