import express from "express";
import {
  getProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
  submitSolution,
  //   getHint,
} from "../controllers/problemController.js";
import { getHint } from "../controllers/hintController.js";
import { runCode } from "../controllers/runController.js";

const router = express.Router();

router.get("/", getProblems); // fetch all
router.get("/:id", getProblemById); // fetch one
router.post("/", createProblem); // add new
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);
router.get("/hint/:id", getHint);
router.post("/solve/:id", submitSolution);
router.post("/:id/run", runCode);

export default router;
