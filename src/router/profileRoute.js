
const express= require('express');
const profileRoute= express.Router();
const {userAuth}= require("../middlewares/auth.js");
const {validateEditProfileData, isStrongPassword}= require("../utils/validator");
const bcrypt= require('bcrypt');


profileRoute.get('/profile',userAuth, (req, res)=>{
    try
    {
        res.send("user name is "+req.user.firstName);
    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }
    
});

profileRoute.patch('/profile/edit',userAuth, async (req, res)=>{
    
    try{
        
        validateEditProfileData(req);
        
        Object.keys(req.body).forEach((key)=>{
            req.user[key]=req.body[key];
        });
        await req.user.save();
        res.send("User updated successfully");
 
    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }
    
});

profileRoute.post('/profile/changePassword',userAuth, async (req, res)=>{
    
    try{

        const {newPassword, oldPassword}= req.body;
        if(! await req.user.validatePassword(req.body.oldPassword)){
            throw new Error("Incorrect password");
        }

        if(!isStrongPassword(newPassword)){
            throw new Error("Weak Password");
        }
        req.user.password= await bcrypt.hash(newPassword,10);
        await req.user.save();

        res.send("Password updated successfully");
    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }
    
});



module.exports= profileRoute;