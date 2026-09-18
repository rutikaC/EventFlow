import express from "express"
import { auth } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
import { 
    deleteProfile,
     getUser, 
    requestPasswordReset, 
    resetPassword, 
    updatePassword, 
    updateProfile 
} from "../controllers/user.controllers.js";

export const userRoutes = express.Router();

userRoutes.get("/profile", auth, getUser);
userRoutes.put("/update/profile/:userId", auth, upload.single("profileImage"),  updateProfile);
userRoutes.delete("/delete/profile/:userId", auth, deleteProfile);
userRoutes.put("/update/password/:userId", auth, updatePassword);
userRoutes.post("/forget/password",  requestPasswordReset);
userRoutes.patch("/reset/password/:token", resetPassword);

