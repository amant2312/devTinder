const express= require('express');
const requestRouter= express.Router();
const User = require('../models/user');



requestRouter.get('/user', async (req, res)=>{
    try{
        const email=req.body.emailId;
        const user= await User.find({emailId: email});
        if(user.length === 0){
            res.send("No user found");
        }
        else{
            res.send(user);
        }
    }
    catch(err){
        res.status(402).send("Something went wrong");
    }
    
});

requestRouter.patch("/user", async (req, res)=> {
    const id= req.body.userId;
    const data= req.body;
    try{
        const ALLLOWED_UPDATES= ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed= Object.keys(data).every((k)=>
            ALLLOWED_UPDATES.includes(k)
        );
        
        if(!isUpdateAllowed){
            throw new Error("Email update is not allowed");
        }
        
        const user= await User.findByIdAndUpdate(id, data, {
            returnDocument: true,
            runValidators:true
        });
        console.log(user);
        res.send("User updated successfully");
    }
    catch(error){
        res.status(400).send("Something went wrong in the update: " + error.message);
    }
});

module.exports= requestRouter;
