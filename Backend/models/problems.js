const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  tags: [String],
  constraints: String,
  examples: [
    {
      input: String,
      output: String,
      explanation: String,
    },
  ],
  approaches: [
    {
      type: {
        type: String,
        enum: ["Brute Force", "Optimized", "Dynamic Programming"],
      },
      code: String,
      explanation: String,
    },
  ],
  visualization: Object, // Prewritten steps JSON if available
  youtubeLinks: [String],
  buggyTemplates: [String], // Store buggy codes
});

module.exports = mongoose.model("Problem", problemSchema);
