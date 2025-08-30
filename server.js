const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/ask', (req, res) => {
    const { message } = req.body;

    // Simple dynamic replies for testing
    let reply = "I don't understand that.";
    if (message.toLowerCase().includes("hi")) reply = "Hello! How are you?";
    if (message.toLowerCase().includes("joke")) reply = "Why did the chicken cross the road? To get to the other side!";
    
    res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


