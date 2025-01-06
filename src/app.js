const express= require("express");
const {middlewarOne,middlewareTwo}= require("./middlewares/auth");

const app=express();

//app.use('/',(req,res)=>{ res.send("hello world"); });
// console.log(m1);
// console.log(m2);


app.use('/test',[middlewarOne, middlewareTwo]);

app.listen(3000,()=>{console.log("listening");});