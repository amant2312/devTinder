const mongoose = require('mongoose');
const URL= "****";

const connectDB = async () => {
    //console.log(connectDB);
    
    await mongoose.connect(URL);

    console.log("DB connected");
};

//console.log(connectDB + "3");

module.exports = connectDB;
