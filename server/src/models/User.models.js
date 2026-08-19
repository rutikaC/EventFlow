import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        maxlenght:8
    },
    role:{
        type:String,
        enum:["user", "organizer"],
        default: "user"
    },
    refreshToken:{
        type:String,
    },
    interests:[
        {type: String}
    ],
    favoriteEvents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Event"
        }
    ]
}, {timeStamps: true});

export const User = mongoose.model("User", userSchema);