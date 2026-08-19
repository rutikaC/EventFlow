import express from "express";
import dotenv from "dotenv"
dotenv.config();
import { connectDB } from "./config/db.js";
import { authRoutes } from "./routes/auth.routes.js";


const app = express();
app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);

const port = process.env.port || 5000;

app.listen(5000, () => {
    console.log(`App is runing on ${port}`);
});