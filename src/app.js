const express= require("express");
const connectDB= require("./config/database");
const bcrypt= require("bcrypt");
const {validateSignUpData} = require("./utils/validator");
const app=express();
const User= require("./models/user");
const cookieParser= require("cookie-parser");
const jwt= require("jsonwebtoken");
const authRouter= require('./router/authRouter.js');
const profileRouter= require('./router/profileRoute.js');
const requestRouter= require('./router/requestRouter.js');


app.use(express.json());
app.use(cookieParser());
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);



connectDB()
    .then(()=>{
        app.listen(3000,()=>{console.log("listening");
        })}
    )
    .catch((err)=>{console.error("Something went wrong");
    });