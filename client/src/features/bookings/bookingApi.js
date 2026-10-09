import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";
import toast from "react-hot-toast";


export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async ({eventId, quantity}, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/book/event/${eventId}`,
        {quantity},
        {
          withCredentials: true,
        }
      );
      
      return res.data;

    } catch (error) {
      
      console.log("Create booking error:", error);

      return rejectWithValue(
        error.response?.data?.message || "Booking failed"
      );
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "bookings/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/book/verify-payment",
        paymentData,
        {
          withCredentials: true,
        }
      );
      
      return res.data;
    } catch (error) {
     
      return rejectWithValue(
        error.response?.data?.message ||
          "Payment verification failed"
      );
    }
  }
);

export const getMyBookings = createAsyncThunk(
  "bookings/getMyBookings",
  async(_ , {rejectWithValue}) => {
    try {
      const res = await api.get("/book/my-bookings", 
        {withCredentials: true}
      )
   
       return res.data.bookings;
    } catch (error) {
      
      return rejectWithValue(error.response?.data?.message 
        || "Failed to fetch bookings")
    }
  }
)

export const getBookingById = createAsyncThunk(
  "bookings/getBookingsById",
  async(_ , {rejectWithValue}) => {
    try {
      const res = await api.get(`/book/booking/${bookingId}`, 
        {withCredentials: true}
      )
    
      return res.data.booking;
    } catch (error) {
    
      return rejectWithValue(error.response?.data?.message 
       || "Failed to fetch bookings"
      )
    }
  }
)