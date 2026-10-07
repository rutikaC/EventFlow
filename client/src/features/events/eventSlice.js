import { createSlice } from "@reduxjs/toolkit";
import { deleteEvent, getEventById, getEvents, getMyEvents, registerEvent, updateEvent } from "./eventApi.js";

const initialState = {
  events: [],
  myEvents:[],
  event: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getEvents
      .addCase(getEvents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload.events; 
        state.error = null;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // getEventById
      .addCase(getEventById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.status = "success";
        state.event = action.payload.event || action.payload;
        state.error = null;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })


      // crete Event

      .addCase(registerEvent.pending,(state) => {
        state.status = "loding";
        state.error = null;
      })
      .addCase(registerEvent.fulfilled, (state, action) => {
        state.status= "success";
        state.event = action.payload.event;
        state.error = null;
      })
      .addCase(registerEvent.rejected, (state,action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // update

      .addCase(updateEvent.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.event = action.payload.event;
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status= "failed";
        state.error = action.payload
      })

      // my events
      
      .addCase(getMyEvents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMyEvents.fulfilled, (state, action)=> {
        state.status= "succeeded";
        state.myEvents = action.payload.events;
      })
      .addCase(getMyEvents.rejected, (state, action) => {
        state.status= "failed";
        state.error = action.payload;
      })

      // delete
      .addCase(deleteEvent.pending, (state)=> {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action)=> {
        state.status="succeeded";
        state.myEvents = state.myEvents.filter(
          (event) => event._id !== action.payload.event._id
        )
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action) =>{
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default eventSlice.reducer;
