const mongoose= require("mongoose");
const validator = require('validator');
const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      lastName: {
        type: String,
      },
      emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
          if(!validator.isEmail(value)){
              throw new Error("Invalid Email Id");
          }
        }
      },
      password: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        min: 18,
      },
      gender: {
        type: String,
        validate(value) {
          if (!["male", "female", "others"].includes(value)) {
            throw new Error("Gender data is not valid");
          }
        },
      },
      photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
      },
      about: {
        type: String,
        default: "This is a default about of the user!",
      },
      skills: {
        type: [String],
      },
    },
    {
      timestamps: true,
    }
  );




// const userSchema= new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String
//     },
//     emailId: {
//         type: String,
//         lowercase: true,
//         required: true,
//         unique: true,
//         trim: true, 
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: String,
//         required: true,
//         min: 18
//     },
//     gender: {
//         type: String,
//         required: true,
//         validate(value) {
//               if(!["male","female","others"].includes(value)){
//                 throw new Error("Gender data is not valid");
//               }
//             }
//     }
// },{timestamps: true}
// );

// // console.log(mongoose.Schema);
// // console.log("\n"+userSchema);
const User= mongoose.model("User",userSchema);
//console.log("\n"+User);

module.exports= User;

