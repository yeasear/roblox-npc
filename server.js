// server.js
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// Make sure to set OPENAI_API_KEY in Render environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Test route
app.get("/", (req, res) => {
  res.send("NPC AI server is running!");
});

// Chat route for Roblox
app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });

    const aiResponse = completion.data.choices[0].message.content.trim();
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error in /chat:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "AI server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

