import mongoose from "mongoose"

export const connectDB = async() => {
    try {
         await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected successfuly`);
    } catch (error) {
        console.log(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
}