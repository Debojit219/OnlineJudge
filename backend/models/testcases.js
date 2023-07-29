const mongoose = require("mongoose");

const testCasesSchema = new mongoose.Schema({
  problemId: {
    type: String,
    ref: "Problem",
  },
  trivial: {
    input: {
      type: String,
      required: true,
    },
    expected_output: {
      type: String,
      required: true,
    },
  },
  correctness: {
    input: {
      type: String,
      required: true,
    },
    expected_output: {
      type: String,
      required: true,
    },
  },
  efficiency: {
    input: {
      type: String,
      required: true,
    },
    expected_output: {
      type: String,
      required: true,
    },
  },
});

const TestCases = mongoose.model("TestCase", testCasesSchema);

module.exports = TestCases;
