const jvt = require("jsonwebtoken");
const User = require('../models/user.js');

const userAuth= async (req,res, next)=>{ 

    try{
    const token= req.cookies.token;
    if(!token){
        throw new Error("Invalid credentials, please login");
    }

    const decrypted= jvt.verify(token,"shhhh");
    const userData= await User.findById(decrypted.id);
    if(!userData)
    {
        throw new Error("Invalid User");
    }
    req.user=userData;
    next();
    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }
}

module.exports = {userAuth};