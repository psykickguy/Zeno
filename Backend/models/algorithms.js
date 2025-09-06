import mongoose from "mongoose";

const algorithmSchema = new mongoose.Schema({
  name: String, // "DFS", "Merge Sort"
  category: String, // "Graph", "Sorting", "Recursion"
  description: String,
  pseudocode: String,
  timeComplexity: String,
  spaceComplexity: String,
  visualization: Object, // base visualization JSON
});

export default mongoose.model("Algorithm", algorithmSchema);
