import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Health check
app.get("/", (req, res) => {
  res.send("NPC AI server is running!");
});

// Endpoint for Roblox to send messages
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    console.log("[NPC AI] Received message:", message);

    // Call OpenAI Chat API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a friendly NPC in Roblox." },
        { role: "user", content: message }
      ]
    });

    const reply = response.choices[0].message.content;
    console.log("[NPC AI] Reply:", reply);

    res.json({ reply });
  } catch (err) {
    console.error("Error handling AI request:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



