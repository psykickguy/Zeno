const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  input: String,
  expectedOutput: String,
  explanation: String,
});

module.exports = mongoose.model("TestCase", testCaseSchema);
