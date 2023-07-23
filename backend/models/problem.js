const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  problemId: {
    type: String,
    required: true,
  },
  problemStatement: {
    statement: String,
    constraint: String,
    exampleInputoutput: String,
    explanation: String,
  },
  solutionCode: {
    type: String,
    required: true,
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
