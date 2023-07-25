// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateProblem from "./Pages/CreateProblem/CreateProblem";
import Problem from "./Pages/Problem/Problem";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<CreateProblem />} />
          <Route exact path="/problem/:id" element={<Problem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
