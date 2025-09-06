// import "dotenv/config";

// async function main() {
//   const response = await fetch("https://api.a4f.co/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.ZENO_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "provider-6/gemini-2.5-flash",
//       messages: [
//         { role: "user", content: "generate a leetcode question for arrays" },
//       ],
//     }),
//   });
//   const data = await response.json();
//   console.log(data.choices[0].message.content);
// }
// main();

import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/", chatRoutes);

// app.post("/chat", async (req, res) => {
//   const { userMessage } = req.body;

//   try {
//     const response = await fetch("https://api.a4f.co/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.ZENO_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "provider-6/gemini-2.5-flash",
//         messages: [{ role: "user", content: "hello" }],
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch response from AI service");
//     }

//     const data = await response.json();
//     res.json(data.choices[0].message.content);
//   } catch (error) {
//     console.error("Error in chat route:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
