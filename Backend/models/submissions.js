import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  userId: { type: String, default: "guest" }, // later replace with real auth
  code: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Wrong Answer"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Submission", submissionSchema);
