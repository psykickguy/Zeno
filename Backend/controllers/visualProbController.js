import Problem from "../models/problems.js";
import { getVisualizationSteps } from "../services/visualizeProblem.js";

export const visualizeProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const { testCase, approachType } = req.body; // user may pass custom testcase + choose approach

    const problem = await Problem.findById(id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    // Validate approachType
    let approach;
    if (approachType) {
      approach = problem.approaches.find((a) => a.type === approachType);
      if (!approach) {
        return res.status(400).json({
          message: `Approach type "${approachType}" not found for this problem. Available approaches: ${problem.approaches
            .map((a) => a.type)
            .join(", ")}`,
        });
      }
    } else {
      // fallback to first approach if frontend doesn't specify
      approach = problem.approaches[0];
    }

    const steps = await getVisualizationSteps(problem, approach, testCase);

    res.json({
      problemId: id,
      title: problem.title,
      approach: approach.type,
      testCase,
      steps,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
