const express= require('express');
const userRouter= express.Router();
const Connection= require('../models/connectionRequest');
const {userAuth}= require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');
const USER_DATA_REQUIRED= "firstName lastName photoUrl age gender about skills";
const User = require('../models/user');

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


userRouter.get("/user/feed", userAuth, async (req, res)=>{
   try{
        const page= (req.query.page)?req.query.page:1;
        let limit=(req.query.limit)?req.query.limit:10;
        if(limit>50){
            limit=50;
        }
        
        const loggedinUserId=req.user._id;
        const connections= await Connection.find({
            $or: [{toUserId: loggedinUserId},{fromUserId: loggedinUserId}]
        }).select("toUserId fromUserId");
        
        const hiddenUsersFeed= new Set();
        connections.forEach((row)=>{
            hiddenUsersFeed.add(row.toUserId);
            hiddenUsersFeed.add(row.fromUserId);
        })
        

        const feedUsers= await User.find({
            $and: [
                { _id: {$nin: Array.from(hiddenUsersFeed)}},
                { _id:{$ne: loggedinUserId}}
            ]
            
        }).select(USER_DATA_REQUIRED)
        .skip((page-1)*10)
        .limit(limit);

        res.json({data: feedUsers});
        
   }
   catch(error){
        res.status(400).json({message: error.message});
   }

});


module.exports= userRouter; 
