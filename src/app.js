const express= require("express")

const app=express();

//app.use('/',(req,res)=>{ res.send("hello world"); });
app.use('/test',(req,res)=>{ res.send("hello world from test"); });
app.use('/dev',(req,res)=>{ res.send("hello world from dev"); });

app.listen(3000,()=>{console.log("listening");
})