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
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(bodyparser.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const resultsSchema = new mongoose.Schema({
    username: String,
    result: String,
    subject: String,
    date: Object,
}, { collection: 'results' });

const quizSchema = new mongoose.Schema({
    title: String,
    question: Array,
});

const contactSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    contactmessage: { type: String, required: true }
}, { collection: 'contact' });

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
const usersSchema = new mongoose.Schema({
    username: String,
}, { collection: "users" });

const User = mongoose.model("User", userSchema);
const Math = mongoose.model("math", mathSchema);
const Html = mongoose.model("html", htmlSchema);
const Users = mongoose.model("Users", usersSchema);
const English = mongoose.model("english", englishSchema);
const History = mongoose.model("history", historySchema);
const Results = mongoose.model("results", resultsSchema);
const Contact = mongoose.model("Contact", contactSchema);

// ----------------- R E G I S T E R & L O G I N ------------------- \\

app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        return res.status(400).json({ message: "user already exists" });
    }
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
        return res.status(400).json({ err: "Invalid password or username" });
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid) {
        return res.status(400).json({ err: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRETJWT);
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
        const resultt = new Results({ username, result, subject, date });
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
//-------------------- D E L E T E  U S E R ------------------\\
const deleteUserAccount = async (identifier) => {
    try {
        const result = await User.deleteOne({ username: identifier });
        const results = await Results.deleteMany({username: identifier});
        if (result.deletedCount === 1) {
            console.log('User account deleted successfully.');
            return { success: true, message: 'User account deleted successfully.' };
        } else {
            console.log('User account not found.');
            return { success: false, message: 'User account not found.' };
        }
    } catch (err) {
        console.error('Error deleting user account:', err);
        return { success: false, message: 'Error deleting user account.' };
    }
};

app.delete('/delete-account/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await deleteUserAccount(userId);
        if (result.success) {
            res.status(200).json({ message: "Deleted successfully" });
        } else {
            res.status(404).json({ message: "Unable to delete" });
        }
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ message: "Server error" });
    }
});



//-------------------- /D E L E T E  U S E R\ ------------------\\
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

// ---------------------- C O N T A C T ------------------------\\
app.post('/api/contact', async (req, res) => {
    const { username, email, contactmessage } = req.body;
    try {
        const contactt = new Contact({ username, email, contactmessage });
        await contactt.save();
        res.status(201).json({ message: "Your Message Sent!" });
    } catch (err) {
        res.status(400).json({ err: "Can't post Result" });
    }
});
app.get("/api/messages", async (req, res) => {
    try {
        const contactt = await Contact.find();
        res.json(contactt);
    } catch (error) {
        res.status(400).json({ error: "Failed to fetch messages" });
    }
});
// ----------------------/ C O N T A C T \ ------------------------\\

// ------------------  L I S T E N - S E R V E R  ------------------ \\
const HOST = process.env.HOST;
app.listen(port, HOST, () => {
    console.log("Server running");
});

// ------------------ / L I S T E N - S E R V E R \ ------------------ \\