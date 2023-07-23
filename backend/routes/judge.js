const express = require("express");
const axios = require("axios");
const TestCases = require("../models/testcases");
const router = express.Router();
TestCases = require("../models/testcases");

const createSubmission = async (sourceCode, languageId, testcase) => {
  const endpoint = "https://api.judge0.com/submissions/";
  const timeLimit = getTimeLimit(languageId);

  const data = {
    source_code: sourceCode,
    language_id: languageId,
    stdin: testcase.input,
    expected_output: testcase.expected_output,
    cpu_time_limit: timeLimit,
  };

  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
};

const getTimeLimit = (languageId) => {
  switch (languageId) {
    case 54: // C++
      return 1000; // 1 second in milliseconds
    case 62: // Java
      return 2000; // 2 seconds in milliseconds
    case 71: // Python
      return 4000; // 4 seconds in milliseconds
    default:
      return 2000; // Default to 2 seconds for other languages
  }
};

router.post("/judge0", async (req, res) => {
  const { sourceCode, languageId, problemId } = req.body;

  const testCases = await TestCases.findOne({ problemId: problemId });

  const trivialTestCase = {
    input: testCases.inputTestCases.trivial,
    expected_output: testCases.expectedOutputs.trivial,
  };

  const correctnessTestCase = {
    input: testCases.inputTestCases.correctness,
    expected_output: testCases.expectedOutputs.correctness,
  };

  const efficiencyTestCase = {
    input: testCases.inputTestCases.efficiency,
    expected_output: testCases.expectedOutputs.efficiency,
  };
  //   const trivialTestCases = testCases.inputTestCases.trivial;
  //   const correctnessTestCases = testCases.inputTestCases.correctness;
  //   const efficiencyTestCases = testCases.inputTestCases.efficiency;

  //   const trivialOutputs = testCases.expectedOutputs.trivial;
  //   const correctnessOutputs = testCases.expectedOutputs.correctness;
  //   const efficiencyOutputs = testCases.expectedOutputs.efficiency;
  createSubmission(sourceCode, languageId, trivialTestCase)
    .then((result) => {
      console.log("Submission created successfully:", result);
    })
    .catch((error) => {
      console.error("Error creating submission:", error);
    });

  createSubmission(sourceCode, languageId, correctnessTestCase)
    .then((result) => {
      console.log("Submission created successfully:", result);
    })
    .catch((error) => {
      console.error("Error creating submission:", error);
    });

  createSubmission(sourceCode, languageId, efficiencyTestCase)
    .then((result) => {
      console.log("Submission created successfully:", result);
    })
    .catch((error) => {
      console.error("Error creating submission:", error);
    });
});
// // Example usage:
// const sourceCode = `#include <iostream>\nusing namespace std;\nint main() { int n; cin >> n; cout << n*n; return 0; }`;
// const languageId = 54; // C++
// const testFiles = {
//   input: "2", // Test input for the source code
//   output: "4", // Expected output for the given input
// };

// createSubmission(sourceCode, languageId, testFiles)
//   .then((result) => {
//     console.log("Submission created successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error creating submission:", error);
//   });
