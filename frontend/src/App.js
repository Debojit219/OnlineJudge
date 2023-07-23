// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateProblem from "./Pages/CreateProblem";
import Problem from "./Pages/Problem";

function App() {
  return (
    <Router>
      <div>
        <h1>Code Editor</h1>
        <Routes>
          <Route exact path="/create" element={<CreateProblem />} />
          <Route exact path="/problem/:id" element={<Problem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
