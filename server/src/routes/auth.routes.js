import express, { raw } from "express"
import {
    getUser,
     loginUser, 
     logoutUser,
     refreshAccessToken, 
     registerUser 
    } from "../controllers/auth.controllers.js";
import {auth} from "../middlewares/auth.middleware.js"

export const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logoutUser);
authRoutes.post("/refresh", refreshAccessToken);
authRoutes.get("/user/profile", auth, getUser);