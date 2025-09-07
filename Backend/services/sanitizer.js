export const sanitizeSteps = (raw) => {
  try {
    // Remove code fences and extra whitespace
    let cleaned = raw.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/```(json)?/g, "").trim();
    }

    const parsed = JSON.parse(cleaned);

    // Handle raw array or { steps: [...] } object
    const steps = Array.isArray(parsed) ? parsed : parsed.steps;
    if (!Array.isArray(steps)) throw new Error("Steps not array");

    // Ensure each step has a stepNumber and type
    return steps.map((s, i) => ({
      stepNumber: i + 1,
      type: s.type || "iteration",
      ...s,
    }));
  } catch (e) {
    console.error("Sanitization failed", e.message);
    return [
      {
        stepNumber: 1,
        type: "solution",
        state: "Visualization failed",
      },
    ];
  }
};
