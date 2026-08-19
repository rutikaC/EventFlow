import mongoose, { mongo } from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true,
    },  
    description:{
        type:String,
    },
    image:{
        type:String,
    }
}, {timestamps: true});

export const category = mongoose.model("Category", categorySchema)