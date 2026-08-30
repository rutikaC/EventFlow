import express, { Router } from "express"
import { 
    deleteEvent,
    getAllEvents,
    getEventById,
    getMyEvents,
    registerEvent, 
    updateEvent,
    updateEventStatus
} from "../controllers/event.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
import {authrole} from "../middlewares/authrole.middleware.js"




export const eventRoutes = express.Router();

eventRoutes.post("/register", auth , authrole, upload.single("image") , registerEvent);
eventRoutes.get("/list", auth, getAllEvents);
eventRoutes.get("/my-events", auth, authrole, getMyEvents);
eventRoutes.patch("/update/status", auth, authrole, updateEventStatus);
eventRoutes.get("/:eventId", auth, getEventById);
eventRoutes.put("/update/:eventId", auth, authrole, upload.single("image"), updateEvent);
eventRoutes.delete("/delete/:eventId", auth, authrole, deleteEvent);
