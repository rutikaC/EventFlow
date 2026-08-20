import express from "express"
import { 
    registerEvent 
} from "../controllers/event.controllers.js";

export const eventRoutes = express.Router();

eventRoutes.post("/register", registerEvent);