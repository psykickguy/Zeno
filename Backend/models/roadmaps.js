import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  topic: String, // e.g., "Recursion"
  subtopics: [String], // ["Basic Recursion", "Backtracking", "Divide & Conquer"]
  order: Number, // sequence
  relatedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
});

export default mongoose.model("Roadmap", roadmapSchema);
