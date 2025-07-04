const express=require('express');
const requestHandelingRouter= express.Router();
const Connection = require('../models/connectionRequest.js');
const {userAuth}= require('../middlewares/auth.js');

requestHandelingRouter.post('/request/send/:status/:toUserId',userAuth,async (req,res)=>{
    
    const toUserId= req.params.toUserId;
    const status= req.params.status;
    const fromUserId= req.user._id;

    console.log(req.params.toUserId);

    const connection= new Connection({fromUserId, toUserId, status});
    await connection.save();
    res.send("success");
});


module.exports= requestHandelingRouter;
