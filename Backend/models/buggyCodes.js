const mongoose = require("mongoose");

const buggyCodeSchema = new mongoose.Schema({
  topic: String, // "DP", "Recursion"
  buggySnippet: String, // pre-stored buggy code
  correctSnippet: String, // fixed version
  explanation: String, // why it's buggy
});

module.exports = mongoose.model("BuggyCode", buggyCodeSchema);
