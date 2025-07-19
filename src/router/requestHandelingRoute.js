const express=require('express');
const requestHandelingRouter= express.Router();
const Connection = require('../models/connectionRequest.js');
const User= require('../models/user.js');
const {userAuth}= require('../middlewares/auth.js');

requestHandelingRouter.post('/request/send/:status/:toUserId',userAuth,async (req,res)=>{
    try{
        const toUserId= req.params.toUserId;
        const user= await User.findById(toUserId);

        if(!user){
            throw new Error("Requested person does not exist");
        }

        const status= req.params.status;
        const fromUserId= req.user._id;

        const allowedStatus= ["interested", "ignored"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid connection request");
        }

        const existingRequest= await Connection.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        });

        if(existingRequest){
            throw new Error("Request already exists");
        }

        const connection= new Connection({fromUserId, toUserId, status});
        await connection.save();
        res.status(200).json({
            message:"success",
            success:true,
        });
    }
    catch(error){
        res.status(400).json({
            message: error.message,
        });
    }
});

requestHandelingRouter.post('/request/review/:status/:requestId',userAuth,async (req,res)=>{
    try{
        const {status, requestId}= req.params;
        const validStatus= ["accepted", "rejected"];
        if(!validStatus.includes(req.params.status)){
            throw new Error("Invalid status request");
        }
        const connection= await Connection.findOne({_id: requestId, toUserId: req.user._id, status: 'interested'});
        if(!connection){
            throw new Error("Request does not exist");
        }
        connection.status= status;
        const retConn=await connection.save();
        res.status(200).json({message: "Success", success: true});
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
    
});


module.exports= requestHandelingRouter;
