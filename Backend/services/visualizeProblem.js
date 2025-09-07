import getGPTResponse from "../utils/gpt.js";
import { sanitizeSteps } from "./sanitizer.js";
import { detectStepTypes } from "../utils/detectStepTypes.js";

export const getVisualizationSteps = async (problem, approach, testCase) => {
  // Detect step types dynamically
  const problemStepTypes = detectStepTypes(problem, approach);
  const stepTypesString = problemStepTypes.map((s) => `"${s}"`).join(" | ");

  const inputExample = JSON.stringify(testCase || problem.examples[0].input);

  const prompt = `
You are a DSA visualization engine.
Problem: ${problem.title}
Constraints: ${problem.constraints}
Approach: ${approach.type}
Explanation: ${approach.explanation}
Code:
${approach.code}

Given input: ${inputExample}

Generate a JSON array of step-by-step visualization states for this algorithm.
Each step MUST follow schema:
{
  "stepNumber": number,
  "type": ${stepTypesString},
  "array"?: [numbers],
  "state"?: any,
  "leftValue"?: number,
  "rightValue"?: number,
  "chosen"?: number,
  "depth"?: number
}
End with a "solution" step containing the final answer.
Return ONLY valid JSON.
`;

  const raw = await getGPTResponse(prompt);
  return sanitizeSteps(raw);
};
