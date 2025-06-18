const validator = require('validator');

function validateSignUpData(req){
    const { firstName, lastName, emailId, password }= req.body;
    if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email Id");
    }
    if(!firstName || !lastName){
        throw new Error("Invalid Name");
    }
    if(!isStrongPassword(password)){
        throw new Error("Weak Password");
    }
    
}

function isStrongPassword(password){
    return validator.isStrongPassword(password);
}

function validateEditProfileData(req){
    const data= req.body;
    
        const ALLLOWED_UPDATES= ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed= Object.keys(data).every((k)=>
            ALLLOWED_UPDATES.includes(k)
        );
        
        if(!isUpdateAllowed){
            throw new Error("Request contains Invalid fields for update");
        }

        if(data.photoUrl!=null){
            if(!validator.isURL(data.photoUrl)){
                throw new Error("Invalid profile URL");
            }
        }
        if(data.skills != null){
            if(data.skills.length > 6){
                throw new Error("Please enter atmost 5 skills");
            }
        }
        

}

module.exports={validateSignUpData, validateEditProfileData, isStrongPassword};
