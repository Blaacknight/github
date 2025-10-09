const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {MongoClient} = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

async function connectClient(){
    if(!client){
        client = new MongoClient(uri, {
            useNewUrlParser:true,
            useUnifiedtopology : true,
        });
        await client.connect();
    }
}

async function signup(req,res)  {
    const {username, password, email} = req.body;
    try{
        await connectClient();
        const db=client.db("apna-github-clone-db");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({username});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            password:hashedPassword,
            email,
            repositories:[],
            followedUsers:[],
            starRepos : []
        }

        const result = await userCollection.insertOne(newUser);
        const token = jwt.sign({id:result.insertId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({token});
    }catch(err){
        console.error("Error during signup : ",err.message);
        res.status(500).send("Server Error");
    }
    
};

async function  login(req, res){
    const {email, password}=req.body;
    try{
        await connectClient();
        const db=client.db("apna-github-clone-db");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.json({token, userId:user._id});
    } catch(err){
        console.error("Error during login: ",err.message);
        res.status(500).send("Server error");
    }

    
};

const getAllUsers = (req, res) => {
    res.send("All users fetched!");
};

const getUserProfile = (req, res) => {
    res.send("Profile fetched!");
};

const updateUserProfile = (req, res) => {
    res.send("Profile updated!");
};

const deleteUserProfile = (req, res) => {
    res.send("Profile deleted!");
};

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
};