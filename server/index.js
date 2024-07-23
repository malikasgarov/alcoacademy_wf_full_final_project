const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const quizSchema = new mongoose.Schema({
    question: String,
    A: String,
    B: String,
    C: String,
    D: String,
    answer: String,
}, { collection: 'quizzes' });

const User = mongoose.model("User", userSchema);
const Quiz = mongoose.model("quizzes", quizSchema);


app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(400).json({ message: "User Registered Succefully" });
    } catch (err) {
        res.status(201).json({ err: "User Already Exists" });
    }
})

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status.json({ error: "Invalid password or username" });
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid) {
        return res.status(400).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user._id }, "RANDOMPASSWORDFORJWTSECRETKEY");
    res.json({ token });
})

app.get("/api/quizzes", async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
});

app.listen(port, () => {
    console.log("Server running");
});

