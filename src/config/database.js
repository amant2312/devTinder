const mongoose = require('mongoose');
const URL= "mongodb+srv://cu18bcs2029:ijqL2ZHPe6vBp5l6@namastenode.bzask.mongodb.net/devTinder";

const connectDB = async () => {
    //console.log(connectDB);
    
    await mongoose.connect(URL);

    console.log("DB connected");
};

//console.log(connectDB + "3");

module.exports = connectDB;
