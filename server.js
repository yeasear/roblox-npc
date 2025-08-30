const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// This is the route Roblox will POST to
app.post("/ask", (req, res) => {
    const message = req.body.message;
    console.log("Received message:", message);

    // For now, send a test reply
    res.json({ reply: "Hello, I am your NPC!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

