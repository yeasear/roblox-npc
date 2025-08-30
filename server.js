import express from "express";
import cors from "cors";
import OpenAI from "openai";

// Make sure you set your OpenAI API key in Render env variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("AI NPC server is running!");
});

// Main chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) return res.json({ response: "No prompt provided." });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    const answer = completion.choices[0].message.content;
    res.json({ response: answer });

  } catch (err) {
    console.error("Error handling AI request:", err);
    res.status(500).json({ response: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


