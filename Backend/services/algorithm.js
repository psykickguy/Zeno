import getGPTResponse from "../utils/gpt.js"; // your existing GPT util

/**
 * Get optimized code for a DSA algorithm
 * @param {String} algorithmName - "N-Queens", "DFS", etc.
 * @param {String} language - "Python", "Java", "C++", etc.
 * @returns {Object} { code, explanation }
 */
export const getAlgorithm = async (algorithmName, language) => {
  const prompt = `
    Provide the most optimized and clean ${language} implementation 
    for the ${algorithmName} algorithm. 
    Include comments explaining the steps and time/space complexity.
  `;

  const response = await getGPTResponse(prompt);

  // GPT might return a long text; split code + explanation if possible
  // assuming GPT returns code in markdown style ```language ... ```
  const codeMatch = response.match(/```(?:\w+)?\n([\s\S]*?)```/);
  const code = codeMatch ? codeMatch[1].trim() : response;

  // optional: extract explanation if GPT includes it outside ``` ```
  const explanation = response
    .replace(codeMatch ? codeMatch[0] : "", "")
    .trim();

  return { code, explanation };
};
