import express from "express";
import {
  getProblems,
  getProblemById,
  createProblem,
} from "../controllers/problemController.js";

const router = express.Router();

router.get("/", getProblems); // fetch all
router.get("/:id", getProblemById); // fetch one
router.post("/", createProblem); // add new

export default router;
