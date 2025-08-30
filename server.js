const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// POST /ask route for Roblox AI
app.post('/ask', (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.json({ reply: "No message received." });
    }

    // Simple AI logic placeholder
    let aiReply;

    if (/hi|hello/i.test(userMessage)) {
        aiReply = "Hello there! How can I help you?";
    } else if (/joke/i.test(userMessage)) {
        aiReply = "Why did the Robloxian cross the road? To get to the other game!";
    } else if (/how are you/i.test(userMessage)) {
        aiReply = "I'm just code, but thanks for asking!";
    } else {
        aiReply = "I didn't understand that.";
    }

    console.log(`[AI Server] User said: ${userMessage} | Reply: ${aiReply}`);
    res.json({ reply: aiReply });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AI server running on port ${PORT}`));

