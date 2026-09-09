import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { createReview, deleteReview, updateReview } from "../controllers/review.controllers.js";

export const reviewRoutes = express.Router();

reviewRoutes.post("/create/:eventId", auth, createReview);
reviewRoutes.put("/update/:eventId", auth, updateReview);
reviewRoutes.delete("/delete/:eventId", auth, deleteReview);