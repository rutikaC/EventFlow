import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controllers.js";

export const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logoutUser);