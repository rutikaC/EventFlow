import mongoose from "mongoose";


const reviewSchem = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required: true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    comment:{
        type:String,
        trim: true
    }
}, {timestamps: true});

export const  Review = mongoose.model("Review", reviewSchem);

