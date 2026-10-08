import { createSlice } from "@reduxjs/toolkit";
import { createBooking, getMyBookings , getBookingById } from "./bookingApi";
console.log({ createBooking, getMyBookings, getBookingById });


 const initialState ={
    booking: null,  
    bookings: [],
    status: "idle",
    error: null,
}
console.log("Thunk types:", {
  createBookingPending: createBooking.pending?.type,
  getMyBookingsPending: getMyBookings.pending?.type,
  getBookingByIdPending: getBookingById.pending?.type,
});

export const bookingSlice = createSlice({
    name:"bookings",
    initialState,
    reducers:{},

    extraReducers: (builder) => {
        console.log("Slice thunks:", { createBooking, getMyBookings, getBookingById });

        builder
        .addCase(createBooking.pending, (state) => {
            state.status= "loading";
            state.error = null;
        })
        .addCase(createBooking.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.booking = action.payload;
            state.error = null;
        })
        .addCase(createBooking.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })

        // get my booking

        .addCase(getMyBookings.pending , (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getMyBookings.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.bookings = action.payload;
            state.error = null;
        })
        .addCase(getMyBookings.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })

        // get bookings by id
        .addCase(getBookingById.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getBookingById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.booking = action.payload;
        })
        .addCase(getBookingById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    }
})


export default bookingSlice.reducer;