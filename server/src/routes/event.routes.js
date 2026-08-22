import express from "express"
import { 
    registerEvent 
} from "../controllers/event.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"




export const eventRoutes = express.Router();

eventRoutes.post("/register", auth , upload.single("image") , registerEvent);