import express from "express"
import { bookEvent, 
    cancelBooking, 
    getEventBooking, 
    getMyBooking, 
    getMyBookingById,
    updateBookingStatus,
    verifyPayment} from "../controllers/booking.controllers.js";
import {auth} from "../middlewares/auth.middleware.js"
import {authrole} from "../middlewares/authrole.middleware.js"

export const bookingRoutes = express.Router();

bookingRoutes.post("/event/:eventId", auth ,  bookEvent);
bookingRoutes.post("/verify-payment", auth, verifyPayment)
bookingRoutes.get("/my-bookings", auth, getMyBooking);
bookingRoutes.get("/booking/:bookingId", auth, getMyBookingById);
bookingRoutes.patch("/booking/cancel/:bookingId", auth, cancelBooking);

bookingRoutes.patch("/booking/status/update/:bookingId", auth, authrole, updateBookingStatus);
bookingRoutes.get("/bookings/:eventId", auth, authrole, getEventBooking)