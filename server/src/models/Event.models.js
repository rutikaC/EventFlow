import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
    },
    organizer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    image:{
        type:String,
    },
    date:{
        type:Date,
        required:true,
    },
    startTime:{
        type:String,
    },
    endTime:{
        type:String,
    },
    venue:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:0,
        required:true
    },
    capacity:{
        type:Number,
        required:true,
    },
    availableSeats:{
        type:Number,
        required:true
    },
    tags:{
        type:String,
        
    },
    status:{
        type:String,

    },

}, {timestamps:true});

export const event = mongoose.model("Event", eventSchema);