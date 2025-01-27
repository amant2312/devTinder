const express= require("express");
const connectDB= require("./config/database");
const app=express();
const User= require("./models/user");

app.use(express.json());


app.get('/user', async (req, res)=>{
    try{
        const email=req.body.emailId;
        const user= await User.find({emailId: email});
        // console.log(user.length);
        if(user.length === 0){
            res.send("No user found");
        }
        else{
            res.send(user);
        }
    }
    catch(err){
        res.status(402).send("Something went wrong");
    }
    
});

app.post("/signup", async (req, res)=> {
    
    const user = new User(req.body);
    try{    
        await user.save();
        res.send("User created successfully");
    }
    catch(error){
        res.status(400).send("Something went wrong " + error.message);
    }
});

connectDB()
    .then(()=>{
        app.listen(3000,()=>{console.log("listening");
        })}
    )
    .catch((err)=>{console.error("Something went wrong");
    });