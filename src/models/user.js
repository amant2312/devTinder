const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: String
    },
    gender: {
        type: String
    }

});

// console.log(mongoose.Schema);
// console.log("\n"+userSchema);
const User= mongoose.model("User",userSchema);
//console.log("\n"+User);

module.exports= User;

