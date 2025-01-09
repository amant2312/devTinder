const express= require("express");
const app=express();
const connectDB = require("./config/database");

connectDB()
    .then(()=>{
        app.listen(3000,()=>{console.log("listening");
        })}
    )
    .catch((err)=>{console.error("Something went wrong");
    });