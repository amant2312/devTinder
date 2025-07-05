const express= require('express');
const authRouter= express.Router();
const User = require('../models/user');
const bcrypt= require('bcrypt');
const {validateSignUpData} = require("../utils/validator");
const {userAuth}= require("../middlewares/auth.js");

authRouter.post("/signup", async (req, res)=> {
    try{    
        validateSignUpData(req);
        const { firstName, lastName, emailId, password }= req.body;
        const passwordHash= await bcrypt.hash(password,10);
        const user= new User({ firstName, lastName, emailId, password: passwordHash });
        await user.save();
        res.send("User created successfully");
    }
    catch(error){
        res.status(400).json({
            message: error.message,
        });
    }
});


authRouter.post("/login", async (req, res)=>{
    try
    {
        const {emailId, password} = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {

          const token =  await user.jwt();
          res.cookie("token", token, {expires: new Date(Date.now() + 9*3600000)});
          res.send("Login Successful!!!");
        } else {
          throw new Error("Invalid credentials");
        }
    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }
});

authRouter.post('/logout', (req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())});
    res.send("Logged out successfully");
});

authRouter.post('/sendConnectionRequest', userAuth, (req, res)=>{
    res.send("Established connection successfully");
});

module.exports=authRouter;