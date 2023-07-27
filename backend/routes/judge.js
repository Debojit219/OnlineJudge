const express = require("express");
const axios = require("axios");
const TestCases = require("../models/testcases");
const router = express.Router();
require("dotenv").config();

// Create submission and call the API for testing against testcases
const createSubmission = async (sourceCode, languageId, testcase) => {
  const timeLimit = getTimeLimit(languageId);

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      wait: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: languageId,
      source_code: Buffer.from(sourceCode).toString("base64"),
      stdin: Buffer.from(testcase.input).toString("base64"),
      expected_output: Buffer.from(testcase.expected_output).toString("base64"),
      cpu_time_limit: timeLimit,
    },
  };
  console.log("Options ", options);

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
};

// Create submission and call the API for providing data againt customInput
const createSubmissionRunTest = async (sourceCode, languageId, customInput) => {
  const timeLimit = getTimeLimit(languageId);

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      fields: "*",
      wait: true,
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: languageId,
      source_code: Buffer.from(sourceCode).toString("base64"),
      stdin: Buffer.from(customInput).toString("base64"),
      cpu_time_limit: timeLimit,
    },
  };

  console.log("Options ", options);

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
};

// Get the run time multiplier for different languages
const getTimeLimit = (languageId) => {
  switch (languageId) {
    case 54: // C++
      return 1; // 1 second in milliseconds
    case 62 || 63: // Java or JavaScript
      return 2; // 2 seconds in milliseconds
    case 71: // Python
      return 4; // 4 seconds in milliseconds
    default:
      return 2; // Default to 2 seconds for other languages
  }
};

/* 
POST route for submit
*/
router.post("/judge0/submit", async (req, res) => {
  const { sourceCode, languageId, problemId } = req.body;

  console.log(req.body);
  const testCases = await TestCases.findOne({ problemId: problemId });

  console.log(testCases);
  const testCase = {
    input: testCases.inputTestCases,
    expected_output: testCases.expectedOutputs,
  };

  createSubmission(sourceCode, languageId, testCase)
    .then((result) => {
      // console.log("Submission created successfully:", result);
      res.json(result);
    })
    .catch((error) => {
      // console.error("Error creating submission:", error);
      res.json(error);
    });
});

/*
POST Route for run test with custom inputs
*/
router.post("/judge0/runtest", (req, res) => {
  const { sourceCode, languageId, customInput } = req.body;

  console.log(req.body);

  createSubmissionRunTest(sourceCode, languageId, customInput)
    .then((result) => {
      // console.log("Submission created successfully:", result);
      res.json(result);
    })
    .catch((error) => {
      // console.error("Error creating submission:", error);
      res.json(error);
    });
});

module.exports = router;
