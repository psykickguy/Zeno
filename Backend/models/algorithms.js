import mongoose from "mongoose";

const algorithmSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // "DFS", "Merge Sort"
    category: { type: String, required: true }, // "Graph", "Sorting", "Recursion"
    description: String, // short description of algorithm
    pseudocode: String, // optional textual pseudocode
    timeComplexity: String, // e.g., "O(n^2)"
    spaceComplexity: String, // e.g., "O(n)"
    examples: [
      // examples for input/output display
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    visualization: Object, // optional prebuilt visualization steps
    maxInputSize: Number, // optional limit for frontend visualizer
  },
  { timestamps: true }
);

export default mongoose.model("Algorithm", algorithmSchema);
