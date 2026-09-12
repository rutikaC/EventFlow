import express from "express"
import { chatAgent, generateDescription } from "../controllers/ai.controllers.js";
import { authrole } from "../middlewares/authrole.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";


export const aiRoutes = express.Router();

aiRoutes.post("/generate-description",  auth,authrole  ,generateDescription);
aiRoutes.post("/chat/agent", auth, chatAgent);