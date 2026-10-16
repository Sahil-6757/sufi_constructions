const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const mongoModel = require("./Controller/MongoSchema");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    });


app.get("/api", (req, res) => {
    res.send("Hello World!");
});

app.post("/auth/register", async (req, res) => {
    try {
        const { username, name, email, password } = req.body || {};
        const userEmail = email || username;
        const userName = name || username;

        if (!userEmail || !password) {
            return res.status(400).json({ success: false, message: "Please enter your username/email and password" });
        }

        const existingUser = await mongoModel.findOne({
            $or: [{ email: userEmail }, { name: userName }]
        });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists with this username/email" });
        }

        const user = new mongoModel({
            name: userName,
            email: userEmail,
            password: password
        });
        await user.save();
        res.status(201).json({ success: true, message: "User registered successfully", user });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        const { username, password } = req.body || {};
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Please enter your username and password" });
        }

        const result = await mongoModel.findOne({
            $or: [{ email: username }, { name: username }],
            password: password
        });

        if (result) {
            console.log("LOGIN SUCCESS for user:", username);
            res.status(200).json({ success: true, message: "Login successful", result });
        } else {
            res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Fallback GET route to prevent crashes if visited in browser
app.get("/auth/login", (req, res) => {
    res.status(405).json({ success: false, message: "Method Not Allowed. Please use POST for login." });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
