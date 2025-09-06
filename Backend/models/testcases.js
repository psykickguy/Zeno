import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  input: String,
  expectedOutput: String,
  explanation: String,
});

export default mongoose.model("TestCase", testCaseSchema);
