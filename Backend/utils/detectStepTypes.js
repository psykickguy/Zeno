export const detectStepTypes = (problem, approach) => {
  const title = problem.title.toLowerCase();
  const tags = problem.tags.map((t) => t.toLowerCase());
  const approachType = approach.type.toLowerCase();

  // Default step types
  let stepTypes = ["iteration", "compare", "place", "solution", "recursion"];

  // Common patterns
  if (title.includes("merge sort") || tags.includes("sorting")) {
    stepTypes = ["split", "compare", "merge", "place", "solution"];
  } else if (title.includes("n-queens") || tags.includes("backtracking")) {
    stepTypes = ["place", "recursion", "solution"];
  } else if (title.includes("trapping rain water") || tags.includes("array")) {
    if (
      approachType.includes("optimized") ||
      approachType.includes("two pointers")
    ) {
      stepTypes = ["iteration", "compare", "place", "solution"];
    } else {
      stepTypes = ["iteration", "compare", "place", "solution"];
    }
  }

  // You can add more patterns here dynamically
  return stepTypes;
};
