const express= require("express");
const connectDB= require("./config/database");
const app=express();
const User= require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res)=> {
    
    const user = new User(req.body);
    try{    
        await user.save();
        res.send("User created successfully");
    }
    catch(error){
        res.sendStatus(400).send(error.message);
    }
});

connectDB()
    .then(()=>{
        app.listen(3000,()=>{console.log("listening");
        })}
    )
    .catch((err)=>{console.error("Something went wrong");
    });