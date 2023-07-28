const express = require("express");
const multer = require("multer");
const router = express.Router();
const Problem = require("../models/problem");
const TestCases = require("../models/testcases");
const { ObjectId } = require("mongodb");

// Set up multer for file uploads
const upload = multer();

// POST route to create a new problem
router.post(
  "/create",
  upload.fields([
    { name: "trivialInputTestFile", maxCount: 1 },
    { name: "trivialOutputTestFile", maxCount: 1 },
    { name: "correctnessInputTestFile", maxCount: 1 },
    { name: "correctnessOutputTestFile", maxCount: 1 },
    { name: "efficiencyInputTestFile", maxCount: 1 },
    { name: "efficiencyOutputTestFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        statement,
        constraint,
        inputoutput,
        explanation,
        solutionCode,
      } = req.body;
      const trivialInputTestFile =
        req.files["trivialInputTestFile"][0].buffer.toString();
      const trivialOutputTestFile =
        req.files["trivialOutputTestFile"][0].buffer.toString();

      const correctnessInputTestFile =
        req.files["correctnessInputTestFile"][0].buffer.toString();
      const correctnessOutputTestFile =
        req.files["correctnessOutputTestFile"][0].buffer.toString();

      const efficiencyInputTestFile =
        req.files["efficiencyInputTestFile"][0].buffer.toString();
      const efficiencyOutputTestFile =
        req.files["efficiencyOutputTestFile"][0].buffer.toString();

      const problemStatement = {
        statement: statement,
        constraint: constraint,
        exampleInputoutput: inputoutput,
        explanation: explanation,
      };

      const problemId = new ObjectId().toString();
      console.log(problemId);
      const newProblem = new Problem({
        title,
        problemId,
        problemStatement,
        solutionCode,
      });

      const newTestCases = new TestCases({
        problemId,
        trivial: {
          input: trivialInputTestFile,
          expected_output: trivialOutputTestFile,
        },
        correctness: {
          input: correctnessInputTestFile,
          expected_output: correctnessOutputTestFile,
        },
        efficiency: {
          input: efficiencyInputTestFile,
          expected_output: efficiencyOutputTestFile,
        },
      });

      await newProblem.save();
      await newTestCases.save();
      res.status(201).json({ response: "New problem created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// GET route to retrieve all problems
router.get("/getall", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to retrieve a single problem by ID
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findOne({ problemId: req.params.id });
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
