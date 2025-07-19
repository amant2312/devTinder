const express= require('express');
const userRouter= express.Router();
const Connection= require('../models/connectionRequest');
const {userAuth}= require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');
const USER_DATA_REQUIRED= "firstName lastName photoUrl age gender about skills";

userRouter.get('/user/request/received',userAuth, async (req,res)=>{
try{
    const userId= req.user._id;
    const connections= await Connection.find({
        toUserId: userId,
        status: "interested"
    }).populate("fromUserId", USER_DATA_REQUIRED);

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

userRouter.get('/user/connections', userAuth, async (req, res)=>{
    try{
        const loggedinUserId= req.user._id;
        const connections= await Connection.find({
            $or:
            [
                {toUserId: loggedinUserId, status: "accepted"},{fromUserId: loggedinUserId, status: "accepted"}
            ]
        }).populate("fromUserId", USER_DATA_REQUIRED)
        .populate("toUserId", USER_DATA_REQUIRED)

        const data= connections.map((row)=>{
            if(row.fromUserId._id.toString() === loggedinUserId.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({
            data: data
        });
    }
    catch(error){
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports= userRouter; 
