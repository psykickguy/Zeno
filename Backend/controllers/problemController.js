import Problem from "../models/problems.js";
import Submission from "../models/submissions.js";

// GET all problems
export const getProblems = async (req, res) => {
  try {
    const filters = {};
    if (req.query.difficulty) filters.difficulty = req.query.difficulty;
    if (req.query.tags) filters.tags = { $in: req.query.tags.split(",") };

    const problems = await Problem.find(filters);
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one problem by id
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    res.json(problem);
  } catch (err) {
    res.status(404).json({ error: "Problem not found" });
  }
};

// POST create a new problem
export const createProblem = async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProblem = async (req, res) => {
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProblem)
      return res.status(404).json({ message: "Problem not found" });
    res.json(updatedProblem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const deleted = await Problem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Problem not found" });
    res.json({ message: "Problem deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const getHint = async (req, res) => {
//   try {
//     const problem = await Problem.findById(req.params.id);
//     if (!problem) {
//       return res.status(404).json({ message: "Problem not found" });
//     }

//     // Later we’ll replace this with an AI API call
//     res.json({
//       problemId: problem._id,
//       hint: "Think about breaking the problem into smaller subproblems first.",
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const submitSolution = async (req, res) => {
  try {
    const { code } = req.body;
    const problemId = req.params.id;

    const submission = new Submission({ problemId, code });
    await submission.save();

    res.json({ message: "Submission received", submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
