const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/ask", (req, res) => {
    const message = req.body.message || "";

    // Simple dynamic response logic
    let reply = "I didn't understand that.";

    if (message.toLowerCase().includes("hi")) {
        reply = "Hello there! How can I help you?";
    } else if (message.toLowerCase().includes("joke")) {
        reply = "Why did the Robloxian cross the road? To get to the other side!";
    } else if (message.toLowerCase().includes("how are you")) {
        reply = "I'm just a bunch of code, but I'm feeling great!";
    }

    res.json({ reply });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
