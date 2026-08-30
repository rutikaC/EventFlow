import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import { authRoutes } from "./routes/auth.routes.js";
import { eventRoutes } from "./routes/event.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { aiRoutes } from "./routes/ai.routes.js";
dotenv.config({ path: "./.env" });


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

connectDB();



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/ai", aiRoutes);

const port = process.env.port || 5000;

app.listen(5000, () => {
    console.log(`App is runing on ${port}`);
});