import getGPTResponse from "../utils/gpt.js"; // your existing GPT util

export const analyzeSolution = async (problem, userCode, language) => {
  // Prepare prompt for GPT
  const prompt = `
You are a coding expert. 
Problem: ${problem.title}
Description: ${problem.description}
User submitted code (language: ${language}):
${userCode}

1. Analyze if this solution is optimal in terms of time & space complexity.
2. If it is optimal, reply with: "optimal".
3. If not optimal, explain what approach should be used, and what can be improved, in a short note.
Return output in JSON: 
{ "optimal": true/false, "suggestion": "..." }
`;

  const response = await getGPTResponse(prompt); // GPT call returns a text response
  try {
    // parse JSON output from GPT
    return JSON.parse(response);
  } catch (err) {
    return { optimal: false, suggestion: "Could not parse GPT response" };
  }
};
