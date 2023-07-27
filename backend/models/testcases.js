const mongoose = require("mongoose");

const testCasesSchema = new mongoose.Schema({
  problemId: {
    type: String,
    ref: "Problem",
  },
  inputTestCases: {
    type: String,
    required: true,
  },
  expectedOutputs: {
    type: String,
    required: true,
  },
});

const TestCases = mongoose.model("TestCase", testCasesSchema);

module.exports = TestCases;
