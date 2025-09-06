const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  topic: String, // e.g., "Recursion"
  subtopics: [String], // ["Basic Recursion", "Backtracking", "Divide & Conquer"]
  order: Number, // sequence
  relatedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
});

module.exports = mongoose.model("Roadmap", roadmapSchema);
