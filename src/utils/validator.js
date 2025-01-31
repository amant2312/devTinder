const validator = require('validator');

function validateSignUpData(req){
    const { firstName, lastName, emailId, password }= req.body;
    if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email Id");
    }
    if(!firstName || !lastName){
        throw new Error("Invalid Name");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Weak Password");
    }
    
}

module.exports={validateSignUpData};