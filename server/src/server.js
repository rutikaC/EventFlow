import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import { authRoutes } from "./routes/auth.routes.js";
import { eventRoutes } from "./routes/event.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { aiRoutes } from "./routes/ai.routes.js";
import {bookingRoutes} from "./routes/booking.routes.js"
import {razorpayPayment} from "./utils/razorpay.utils.js"
dotenv.config({ path: "./.env" });


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

connectDB();
razorpayPayment;


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/book", bookingRoutes);

const port = process.env.port || 5000;

app.listen(5000, () => {
    console.log(`App is runing on ${port}`);
});