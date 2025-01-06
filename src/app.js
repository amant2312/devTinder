const express= require("express");
const {middlewarOne,middlewareTwo}= require("./middlewares/auth");

const app=express();

//app.use('/',(req,res)=>{ res.send("hello world"); });
// console.log(m1);
// console.log(m2);


app.use('/test',[middlewarOne, middlewareTwo]);

app.use('/', (err, req, res, next)=>{
    if(err){
        res.status(500).send("Service unavailable");
    }
    
});

app.listen(3000,()=>{console.log("listening");});