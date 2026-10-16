const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello World!");
});

app.post("/auth/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Please enter your username and password" });
    }
    res.json({ message: username });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
