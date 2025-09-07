import getGPTResponse from "../utils/gpt.js";

/**
 * Build a strict GPT prompt instructing the model to return ONLY a JSON array
 * describing steps. The "strict" flag strengthens the instruction on retries.
 */
const buildPrompt = (algorithmName, inputData, strict = false) => {
  const inputStr =
    typeof inputData === "string" ? inputData : JSON.stringify(inputData);
  const strictNote = strict
    ? "\nIMPORTANT: Previous response was invalid. THIS TIME return EXACTLY the JSON array and NOTHING else. Do NOT use backticks, do NOT add explanation, do NOT add markdown, only raw JSON."
    : "";

  return `
You will simulate the algorithm "${algorithmName}" on this input: ${inputStr}

Return the step-by-step execution as a JSON array. **Return only the JSON array** (no explanatory text, no markdown, no code fences). Each step must be an object with at least:
- stepNumber (integer)
- type (string) — e.g. "split", "compare", "merge", "place", "remove", "solution", "board"
- additional fields depending on type:
    - for arrays: "array" or "state" (array of numbers)
    - for compare: "leftValue", "rightValue"
    - for place/remove: "value", optionally "array"
    - for board: "state" (2D array)
- recursion depth: "depth" (integer) when applicable

Example (merge sort) — output MUST follow this format exactly:
[
  { "stepNumber": 1, "type": "split", "array": [38,27,43,3,9,82,10], "depth": 0 },
  { "stepNumber": 2, "type": "split", "array": [38,27,43], "depth": 1 },
  { "stepNumber": 3, "type": "compare", "leftValue": 38, "rightValue": 27, "depth": 2 },
  { "stepNumber": 4, "type": "place", "value": 27, "array": [27], "depth": 2 },
  ...
]

${strictNote}

Return ONLY the JSON array (raw). Do not include any non-JSON characters, DO NOT wrap in triple backticks.
`;
};

/**
 * Sanitize GPT response text and try to extract the JSON array substring.
 * - Removes code fences if present
 * - Extracts first balanced [...] block if present
 * - Removes trailing commas before ] / }
 * - Converts single-quotes to double-quotes heuristically if needed
 */
const sanitizeGPTResponse = (text) => {
  if (!text || typeof text !== "string") throw new Error("Empty GPT response");

  let s = text.trim();

  // 1) If there are fenced code blocks, extract inner content
  const fenceMatch = s.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch && fenceMatch[1]) {
    s = fenceMatch[1].trim();
  }

  // 2) Remove leftover backticks or leading 'json' token
  s = s.replace(/```/g, "").trim();
  s = s.replace(/^\s*json[:\s]*/i, "").trim();

  // 3) If there's an obvious JSON array inside a bunch of text, extract from first '[' to last ']'
  const firstBracket = s.indexOf("[");
  const lastBracket = s.lastIndexOf("]");
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    s = s.substring(firstBracket, lastBracket + 1);
  }

  // 4) Remove trailing commas in objects/arrays (`, ]` or `, }`)
  s = s.replace(/,\s*]/g, "]").replace(/,\s*}/g, "}");

  // 5) If single quotes appear MUCH more than double quotes, convert single -> double (heuristic)
  const singleQuotes = (s.match(/'/g) || []).length;
  const doubleQuotes = (s.match(/"/g) || []).length;
  if (singleQuotes > doubleQuotes) {
    s = s.replace(/'/g, '"');
  }

  // 6) Trim again
  return s.trim();
};

/**
 * Parse and validate the steps object returned by GPT.
 * Throws descriptive Error if invalid.
 */
const parseAndValidateSteps = (rawText) => {
  const cleaned = sanitizeGPTResponse(rawText);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    // include cleaned preview in error for easier debugging
    throw new Error(
      `Could not JSON.parse sanitized GPT output. cleanedPreview: ${cleaned.slice(
        0,
        500
      )}`
    );
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Parsed JSON is not an array");
  }
  if (parsed.length === 0) {
    throw new Error("Parsed steps array is empty");
  }

  // Basic validation of each step
  for (let i = 0; i < parsed.length; i++) {
    const st = parsed[i];
    if (typeof st !== "object" || st === null)
      throw new Error(`Step ${i} is not an object`);
    if (!("stepNumber" in st))
      throw new Error(`Missing 'stepNumber' in step index ${i}`);
    if (!("type" in st)) throw new Error(`Missing 'type' in step index ${i}`);
    // normalize stepNumber to number when possible
    if (typeof st.stepNumber !== "number") {
      const n = Number(st.stepNumber);
      if (Number.isNaN(n)) throw new Error(`Invalid stepNumber at index ${i}`);
      st.stepNumber = n;
    }
  }

  // Optionally sort by stepNumber to be safe
  parsed.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0));

  return parsed;
};

/**
 * Main exported function: ask GPT for visualization steps, sanitize + validate.
 * - algorithmName: string, e.g. "merge sort"
 * - inputData: any serializable input (array, number, object)
 * - options: { maxRetries: number } (default 1)
 */
export const getVisualizationSteps = async (
  algorithmName,
  inputData,
  options = {}
) => {
  const maxRetries =
    typeof options.maxRetries === "number" ? options.maxRetries : 1;
  let attempt = 0;
  let lastResponse = null;
  let lastError = null;

  while (attempt <= maxRetries) {
    const strict = attempt > 0; // be stricter on retries
    const prompt = buildPrompt(algorithmName, inputData, strict);

    // call GPT
    const response = await getGPTResponse(prompt);
    lastResponse = response;

    try {
      const steps = parseAndValidateSteps(response);
      return steps;
    } catch (err) {
      lastError = err;
      // if not last attempt, increment and retry
      attempt += 1;
      continue;
    }
  }

  // if we reach here, all attempts failed
  // throw an informative error including the last GPT text (shortened)
  const preview = (lastResponse || "").toString().slice(0, 1200);
  throw new Error(
    `Invalid JSON from GPT after ${maxRetries + 1} attempts: ${
      lastError?.message
    }\nLast GPT response preview:\n${preview}`
  );
};
