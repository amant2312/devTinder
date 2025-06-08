const mongoose= require("mongoose");
const validator = require('validator');
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");


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

  userSchema.methods.jwt = async function() {
    const user = this;
    const token= await jwt.sign({id: user._id},"shhhh",{expiresIn: '1d'});
    return token;
  }

  userSchema.methods.validatePassword= async function(userPassword){

    const user = this;
    const isPasswordValid= await bcrypt.compare(userPassword, user.password);
    return isPasswordValid;

  }


const User= mongoose.model("User",userSchema);
module.exports= User;

