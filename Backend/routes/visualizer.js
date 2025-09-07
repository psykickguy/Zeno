import express from "express";
import {
  getOptimizedAlgorithm,
  visualizeAlgorithm,
} from "../controllers/visualizerController.js";

const router = express.Router();

router.post("/algorithm", getOptimizedAlgorithm);
router.post("/visualize", visualizeAlgorithm);

export default router;
