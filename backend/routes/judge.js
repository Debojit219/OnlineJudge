const express = require("express");
const axios = require("axios");
const TestCases = require("../models/testcases");
const router = express.Router();

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
      "X-RapidAPI-Key": "ddca755266mshf7e9d34ae01d293p1c51f3jsn1def093c4144",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: languageId,
      source_code: Buffer.from(sourceCode).toString("base64"),
      stdin: Buffer.from(testcase.input).toString("base64"),
      expected_output:
        testcase.expected_output != null
          ? Buffer.from(testcase.expected_output).toString("base64")
          : null,
      cpu_time_limit: timeLimit,
    },
  };

  console.log(options);

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    // console.error("Error creating submission:", error);
    throw error;
  }
};

const getTimeLimit = (languageId) => {
  switch (languageId) {
    case 54: // C++
      return 1; // 1 second in milliseconds
    case 62: // Java
      return 2; // 2 seconds in milliseconds
    case 71: // Python
      return 4; // 4 seconds in milliseconds
    default:
      return 2; // Default to 2 seconds for other languages
  }
};

router.post("/judge0", async (req, res) => {
  // console.log("JUDGE!");
  const { sourceCode, languageId, customInput, problemId } = req.body;

  console.log(req.body);
  if (customInput == null) {
    const testCases = await TestCases.findOne({ problemId: problemId });

    console.log(testCases);
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

    createSubmission(sourceCode, languageId, trivialTestCase)
      .then((result) => {
        console.log("Submission created successfully:", result);
        res.json(result);
      })
      .catch((error) => {
        console.error("Error creating submission:", error);
        res.json(error);
      });

    // createSubmission(sourceCode, languageId, correctnessTestCase)
    //   .then((result) => {
    //     console.log("Submission created successfully:", result);
    //     res.json(result);
    //   })
    //   .catch((error) => {
    //     console.error("Error creating submission:", error);
    //     res.json(error);
    //   });

    // createSubmission(sourceCode, languageId, efficiencyTestCase)
    //   .then((result) => {
    //     console.log("Submission created successfully:", result);
    //     res.json(result);
    //   })
    //   .catch((error) => {
    //     console.error("Error creating submission:", error);
    //     res.json(error);
    //   });
  } else {
    createSubmission(sourceCode, languageId, {
      input: customInput,
      expected_output: null,
    })
      .then((result) => {
        console.log("Submission created successfully:", result);
        res.json(result);
      })
      .catch((error) => {
        console.error("Error creating submission:", error);
        res.json(error);
      });
  }
});

module.exports = router;
