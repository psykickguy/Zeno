import { JUDGE0_URL, JUDGE0_KEY, languageMap } from "../utils/judge0.js";

export const runOnJudge0 = async (sourceCode, language, stdin) => {
  const payload = {
    source_code: sourceCode,
    language_id: languageMap[language.toLowerCase()],
    stdin: stdin || "",
  };

  const response = await fetch(
    `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(JUDGE0_KEY ? { "X-RapidAPI-Key": JUDGE0_KEY } : {}),
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Judge0 error: ${response.status} - ${errorText}`);
  }

  return await response.json();
};
