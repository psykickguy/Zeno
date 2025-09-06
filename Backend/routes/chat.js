import "dotenv/config";

import express from "express";
import getGPTResponse from "../utils/gpt.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Chat API");
});

router.post("/chat", async (req, res) => {
  try {
    // Extract the message from req.body
    const { message } = req.body;

    // Validate that message exists
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call getGPTResponse with just the message string
    const response = await getGPTResponse(message);

    // Send the response directly (no need to call .json() again)
    res.json({ content: response });
  } catch (error) {
    console.error("Error in chat route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
