// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Main NPC route
app.post("/ask", (req, res) => {
  const userMessage = req.body.message;

  console.log("[NPC Server] Received message:", userMessage);

  // Simple NPC reply logic
  let reply = "I didn't get that.";

  if (userMessage) {
    // Example basic responses
    if (userMessage.toLowerCase() === "hi") {
      reply = "Hello, I am your NPC!";
    } else if (userMessage.toLowerCase() === "how are you?") {
      reply = "I am doing great!";
    } else if (userMessage.toLowerCase() === "tell me a joke") {
      reply = "Why did the Robloxian cross the road? To get to the other server!";
    } else {
      reply = "You said: " + userMessage;
    }
  }

  res.json({ reply });
});

// Start server
app.listen(PORT, () => {
  console.log(`NPC server running on port ${PORT}`);
});
