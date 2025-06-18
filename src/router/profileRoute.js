
const express= require('express');
const profileRoute= express.Router();
const {userAuth}= require("../middlewares/auth.js");
const {validateEditProfileData}= require("../utils/validator");


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



module.exports= profileRoute;