import { createSlice } from "@reduxjs/toolkit";
import { createBooking } from "./bookingApi";


 const initialState ={
    booking: null,  
    status: "idle",
    error: null,
}
export const bookingSlice = createSlice({
    name:"bookings",
    initialState,
    reducers:{},

    extraReducers: (builder) => {
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
    }
})


export default bookingSlice.reducer;