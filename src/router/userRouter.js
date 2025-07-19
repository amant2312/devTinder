const express= require('express');
const userRouter= express.Router();
const Connection= require('../models/connectionRequest');
const {userAuth}= require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');


userRouter.get('/user/request/received',userAuth, async (req,res)=>{
try{
    const userId= req.user._id;
    const connections= await Connection.find({
        toUserId: userId,
        status: "interested"
    }).populate("fromUserId", "firstName lastName photoUrl age gender about skills");

    if(!connections){
        throw new Error("No request found");
    }

    res.status(200).json({
            message: "Data fetched successfully",
            data: connections,
        });
}
catch(error){
    res.status(404).json({message: error.message});
}
});

module.exports= userRouter; 
