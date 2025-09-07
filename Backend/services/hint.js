import getGPTResponse from "../utils/gpt.js";

export const generateHint = async (problem) => {
  const prompt = `
You are a helpful DSA tutor. 
The problem is titled "${problem.title}".
Description: ${problem.description}
Constraints: ${problem.constraints || "Not specified"}.
Tags: ${problem.tags.join(", ")}.

Give the student a **single short hint** about how to approach the problem. 
Do not provide the full solution or code. 
Just give a guiding nudge in 2-3 sentences.
  `;

  return await getGPTResponse(prompt);
};
