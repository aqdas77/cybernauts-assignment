require('dotenv').config();
const express = require('express');
const app= express();
const cors = require('cors');
const connection = require('./db');
const {User} = require('./models/user')

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/logic', express.static('logic'));
app.use(express.static('public'));
app.use(cors());

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+ "/pages/login.html");
})

app.get("/signup",(req,res)=>{
    res.sendFile(__dirname+ "/pages/signup.html");
})
app.get("/home",(req,res)=>{
    res.sendFile(__dirname+"/pages/home.html");
})

app.post("/signup", async (req, res) => {
    try {
        console.log("Received signup request");
        const newUser = new User({
            firstName : req.body.firstname,
            lastName : req.body.lastname,
            email : req.body.email,
            userName : req.body.username,
            password : req.body.password,
        })
  
      const user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already Exist!" });
  
      await newUser.save();
      console.log("User saved successfully");
      res.status(200).send({ message: "User created successfully" });
      
    } catch (error) {
        console.error("Error saving user:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
 
  app.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "Incorrect email or password" });
      }
      if(user.password===req.body.password)
      res.status(200).send({ data: user, message: "logged in successfully" });
      else
      return res.status(401).json({message :"Password does not match"})
    }   catch (error) {
      console.error("Error fetching user data:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}...`));
