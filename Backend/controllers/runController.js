import Problem from "../models/problems.js";
import { runOnJudge0 } from "../services/judge0.js";

const parseOutput = (str) => {
  try {
    // convert single quotes to double quotes for JSON parsing
    return JSON.parse(str.replace(/'/g, '"'));
  } catch {
    return str?.trim(); // fallback for non-JSON outputs
  }
};

export const runCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    const problem = await Problem.findById(req.params.id);

    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const results = [];
    let passCount = 0;

    for (const e of problem.examples) {
      const execResult = await runOnJudge0(code, language, e.input);
      const output = execResult.stdout
        ? execResult.stdout.trim()
        : execResult.stderr;

      const pass =
        JSON.stringify(parseOutput(output)) ===
        JSON.stringify(parseOutput(e.output));

      if (pass) passCount++;

      results.push({
        input: e.input,
        expected: e.output,
        output,
        pass,
      });
    }

    res.json({
      score: `${passCount}/${problem.examples.length}`,
      results,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
