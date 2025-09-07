import Problem from "../models/problems.js";
import { generateHint } from "../services/hint.js";

export const getHint = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const hint = await generateHint(problem);

    res.json({ hint });
  } catch (err) {
    console.error("Error in getHint:", err);
    res.status(500).json({ message: err.message });
  }
};
