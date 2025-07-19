const mongoose= require('mongoose');


const connectionRequestSchema= new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest= this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot sent connection request to yourself");
    }
    next();
});

const connectionRequest= mongoose.model("connectionRequest", connectionRequestSchema);
module.exports= connectionRequest;