import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:1,
    },
    amount:{
        type:Number,
        required:true,
    },
    paymentStatus:{
        type:String,
        enum:["pending", "paid", "failed", "refunded"],
        default: "pending"
    },
    bookingStatus:{
        type:String,
        enum:["pending" , "confirmed", "cancelled"],
        default:"pending",
    },
    paymentId:{
        type:String,
    },
    ticketId:{
        type:String,
    }
}, {timeseries: true});

export const Booking = mongoose.model("Booking", bookingSchema);