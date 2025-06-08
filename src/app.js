const express= require("express");
const connectDB= require("./config/database");
const bcrypt= require("bcrypt");
const {validateSignUpData} = require("./utils/validator");
const app=express();
const User= require("./models/user");
const cookieParser= require("cookie-parser");
const jwt= require("jsonwebtoken");
const {userAuth}= require("./middlewares/auth.js")

app.use(express.json());
app.use(cookieParser());


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

app.patch("/user", async (req, res)=> {
    const id= req.body.userId;
    const data= req.body;
    try{
        const ALLLOWED_UPDATES= ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed= Object.keys(data).every((k)=>
            ALLLOWED_UPDATES.includes(k)
        );
        
        if(!isUpdateAllowed){
            throw new Error("Email update is not allowed");
        }
        
        const user= await User.findByIdAndUpdate(id, data, {
            returnDocument: true,
            runValidators:true
        });
        console.log(user);
        res.send("User updated successfully");
    }
    catch(error){
        res.status(400).send("Something went wrong in the update: " + error.message);
    }
});

app.post("/login", async (req, res)=>{

    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        // const {id}= user._id;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {

          const token =  jwt.sign({id: user._id},"shhhh",{expiresIn: '1d'});
          res.cookie("token", token, {expire: new Date(Date.now() +9*3600000)});
          res.send("Login Successful!!!");
        } else {
          throw new Error("Invalid credentials");
        }

        // console.log(emailId);
        // const user= await User.findOne({emailId});
        // // console.log((bcrypt.hash(password,10))+ "  AND     "  + user.password );
        // const encryptedHash = await bcrypt.hash(password,10);
        // if(! encryptedHash == user.password ){
        //     throw new Error("Invalid User");
        // }
        // res.send("Authentication Successfull");
    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }
    

});

app.post('/sendConnectionRequest', userAuth, (req, res)=>{
    res.send("Established connection successfully");
});

app.get('/profile',userAuth, (req, res)=>{

    try{
        //validate cookie id
        /* if(!req.cookies.token){
            throw new Error("Invalid token");
        }
        const decrypted =jwt.verify(req.cookies.token, "shhhh");
        //return user info
        const user= await User.findById(decrypted.id);
        if(!user){
            throw new Error("Invalid User");
        }
        console.log(user); */

        res.send("user name is "+req.user.firstName);

    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }
    
});

app.post("/signup", async (req, res)=> {

    try{    
        validateSignUpData(req);
        const { firstName, lastName, emailId, password }= req.body;

        const passwordHash= await bcrypt.hash(password,10);
        console.log(passwordHash);

        const user= new User({ firstName, lastName, emailId, password: passwordHash });
        await user.save();
        res.send("User created successfully");
    }
    catch(error){
        res.status(400).send("Error : " + error.message);
    }
});

connectDB()
    .then(()=>{
        app.listen(3000,()=>{console.log("listening");
        })}
    )
    .catch((err)=>{console.error("Something went wrong");
    });