// import * as visualizer from "../services/visualizer.js";

// export const generateNQueensSteps = async (req, res) => {
//   try {
//     const { n } = req.body;
//     if (!n || n <= 0) return res.status(400).json({ message: "Invalid input" });

//     const steps = visualizer.getNQueensSteps(n);
//     res.json({ steps, algorithm: "N-Queens" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import { getAlgorithm } from "../services/algorithm.js";
import { getVisualizationSteps } from "../services/visualizer.js"; // your current visualizer logic

//Return optimized code
export const getOptimizedAlgorithm = async (req, res) => {
  try {
    const { algorithmName, language } = req.body;
    if (!algorithmName || !language)
      return res.status(400).json({ message: "Invalid input" });

    const { code, explanation } = await getAlgorithm(algorithmName, language);

    res.json({ code, explanation, algorithm: algorithmName, language });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate visualization steps

export const visualizeAlgorithm = async (req, res) => {
  try {
    const { algorithmName, input } = req.body;
    if (!algorithmName)
      return res.status(400).json({ message: "algorithmName is required" });

    // optional: limit or validate input size here (e.g., arrays > length 20 -> reject)
    // call GPT-driven visualizer (includes sanitization + retry)
    const steps = await getVisualizationSteps(algorithmName, input, {
      maxRetries: 1,
    });

    return res.json({ algorithmName, steps });
  } catch (err) {
    console.error("visualize error:", err);
    return res.status(500).json({ message: err.message });
  }
};
