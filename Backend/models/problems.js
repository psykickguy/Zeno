import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  tags: [String],
  constraints: String,
  examples: [
    {
      input: mongoose.Schema.Types.Mixed, // can be string, number, array, object
      output: mongoose.Schema.Types.Mixed,
      explanation: String,
    },
  ],
  approaches: [
    {
      type: {
        type: String,
        enum: [
          "Brute Force",
          "Optimized",
          "Dynamic Programming",
          "Backtracking",
        ],
      },
      code: String,
      explanation: String,
    },
  ],
  visualization: {
    type: mongoose.Schema.Types.Mixed, // e.g. JSON with recursion states
  },
  youtubeLinks: [String],
  buggyTemplates: [String], // Store buggy codes
  source: {
    type: String,
    enum: ["LeetCode", "GFG", "Custom", "Other"],
    default: "Custom",
  },
});

export default mongoose.model("Problem", problemSchema);
