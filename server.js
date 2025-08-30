const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: req.body.message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "error" });
  }
});

app.listen(3000, () => console.log("server running"));
