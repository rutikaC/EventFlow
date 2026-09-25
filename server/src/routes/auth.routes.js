import express, { raw } from "express"
import {
     loginUser, 
     refreshAccessToken, 
     registerUser 
    } from "../controllers/auth.controllers.js";
import {auth} from "../middlewares/auth.middleware.js"
import { googleLogin } from "../controllers/googleAuth.controllers.js";

export const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/refresh", refreshAccessToken);


authRoutes.post("/google/register", googleLogin);