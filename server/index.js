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
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
});

const User = mongoose.model("User",userSchema);
app.post("/api/register", async (req, res)=>{
    const {username, password}=req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const newUser = new User({username, password:hashedPassword});
        await newUser.save();
        res.status(400).json({message:"User Registered Succefully"});
    }catch(err){
        res.status(201).json({err:"User Already Exists"});
    }
})

app.post("/api/login", async(req, res)=>{
    const {username, password}=req.body;
    const user = await User.finOne({username});
    if(!user){
        return res.status.json({error:"Invalid password or username"});
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if(!isPasswordvalid){
        return res.status(400).json({error:"Invalid username or password"});
    }
    const token = jwt.sign({id:user._id}, process.env.SECRETJWT);
    res.json({token});



})

app.listen(port, ()=>{
    console.log("Server running");
});


