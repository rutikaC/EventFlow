import { createAsyncThunk } from "@reduxjs/toolkit";


export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/book/event/${eventId}`,
        {},
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

