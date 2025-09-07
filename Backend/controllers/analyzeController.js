import Problem from "../models/problems.js";
import { analyzeSolution } from "../services/analyze.js";

export const analyzeCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const analysis = await analyzeSolution(problem, code, language);

    res.json({
      problemId: req.params.id,
      optimal: analysis.optimal,
      suggestion: analysis.suggestion,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
