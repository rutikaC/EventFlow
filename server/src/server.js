import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import { authRoutes } from "./routes/auth.routes.js";
import { eventRoutes } from "./routes/event.routes.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config({ path: "./.env" });


const app = express();
app.use(express.json());

connectDB();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api:process.env.CLOUDINARY_API_KEY,
    cloud_secret:process.env.CLOUDINARY_API_SECRET
})

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/event", eventRoutes)

const port = process.env.port || 5000;

app.listen(5000, () => {
    console.log(`App is runing on ${port}`);
});