const mongoose = require("mongoose");

const testCasesSchema = new mongoose.Schema({
  problemId: {
    type: String,
    ref: "Problem",
  },
  inputTestCases: {
    trivial: String,
    correctness: String,
    efficiency: String,
  },
  expectedOutputs: {
    trivial: String,
    correctness: String,
    efficiency: String,
  },
});

const TestCases = mongoose.model("TestCase", testCasesSchema);

module.exports = TestCases;
