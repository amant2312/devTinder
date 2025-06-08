const jvt = require("jsonwebtoken");
const User = require('../models/user.js');

const userAuth= async (req,res, next)=>{ 

    try{
    // Token in cookie
    const token= req.cookies.token;
    console.log(token);
    if(!token){
        throw new Error("Invalid credentials, please login");
    }
    
    // Token Valid
     const decrypted= jvt.verify(token,"shhhh");

    //Token in DB
    const userData= await User.findById(decrypted.id);

    // Append User ton the req.cookie
    if(!userData)
    {
        throw new Error("Invalid User");
    }
    console.log(userData);
    req.user=userData;
    next();

    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }
}

module.exports = {userAuth};