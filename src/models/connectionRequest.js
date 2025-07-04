const mongoose= require('mongoose');


const connectionRequestSchema= new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: String,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUES} is of incorrect status type`
        }

    }
},
    {
        timestamp: true
    }
);

const connectionRequest= mongoose.model("connectionRequest", connectionRequestSchema);
module.exports= connectionRequest;