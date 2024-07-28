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
app.use(bodyparser.json())

mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const resultsSchema = new mongoose.Schema({
    username:String,
    result: String,
    subject: String,
    date:Object,
}, {collection:'results'});

const quizSchema = new mongoose.Schema({
    title: String,
    question: Array,
});

const mathSchema = new mongoose.Schema({
    title: String,
    questions: Array,
}, { collection: 'math' });

const htmlSchema = new mongoose.Schema({
    title: String,
    questions: Array,
}, { collection: 'html' });

const historySchema = new mongoose.Schema({
    title: String,
    questions: Array,
}, { collection: 'history' });

const englishSchema = new mongoose.Schema({
    title: String,
    questions: Array,
}, { collection: 'english' });

const User = mongoose.model("User", userSchema)
const Math = mongoose.model("math", mathSchema);
const Html = mongoose.model("html", htmlSchema);
const English = mongoose.model("english", englishSchema);
const History = mongoose.model("history", historySchema)
const Results = mongoose.model("results", resultsSchema);

// ----------------- R E G I S T E R & L O G I N ------------------- \\

app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User Registered Succefully" });
    } catch (err) {
        res.status(400).json({ err: "User Already Exists" });
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
});


// ----------------- / R E G I S T E R & L O G I N \------------------- \\

//------------------- R E S U L T S ----------------------\\
app.get("/api/getresults", async (req, res) => {
    try {
        const results = await Results.find();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Failed to get Results" });
    }
});
app.post('/api/postresults', async (req, res) => {
    const { username, result, subject, date } = req.body;
    try {
        const resultt = new Results({ username, result, subject, date});
        await resultt.save();
        res.status(201).json({ message: "Result saved Successfully" });
    } catch (err) {
        res.status(400).json({ err: "Can't post Result" });
    }
});
//------------------- / R E S U L T S \ ----------------------\\

// ------------------ L E N G H T ----------------------- \\

app.get("/api/userslength", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch length" });
    }
});

// ------------------ / L E N G H T \ ----------------------- \\

// ------------------ Q U I Z Z E S --------------------- \\

app.get("/api/math", async (req, res) => {
    try {
        const quizzes = await Math.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
});
app.get("/api/programming", async (req, res) => {
    try {
        const quizzes = await Html.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
});
app.get("/api/history", async (req, res) => {
    try {
        const quizzes = await History.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
});
app.get("/api/english", async (req, res) => {
    try {
        const quizzes = await English.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
});

// ------------------ / Q U I Z Z E S \ --------------------- \\

// ------------------  L I S T E N - S E R V E R  ------------------ \\
app.listen(port, () => {
    console.log("Server running");
});

// ------------------ / L I S T E N - S E R V E R \ ------------------ \\