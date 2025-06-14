
const express= require('express');
const profileRoute= express.Router();
const {userAuth}= require("../middlewares/auth.js");


profileRoute.get('/profile',userAuth, (req, res)=>{
    try
    {
        res.send("user name is "+req.user.firstName);
    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }
    
});

module.exports= profileRoute;