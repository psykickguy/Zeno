const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // auto-delete in 5 mins

  progress: [
    {
      problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
      status: { type: String, enum: ["Solved", "Attempted", "Failed"] },
      attempts: Number,
      userTestCases: [{ input: String, output: String, passed: Boolean }],
    },
  ],
  currentTopic: String,
});

module.exports = mongoose.model("Session", sessionSchema);
