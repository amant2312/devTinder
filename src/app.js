const express= require("express")

const app=express();

//app.use('/',(req,res)=>{ res.send("hello world"); });
app.use('/test',[(req,res,next)=>{ next(); /* res.send("hello world from 1st")*/}, (req,res)=>{ res.send("hello world from 2nd"); }]);

app.listen(3000,()=>{console.log("listening");
})