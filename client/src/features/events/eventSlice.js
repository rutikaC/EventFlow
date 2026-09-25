import { createSlice } from "@reduxjs/toolkit";
import { getEventById, getEvents, registerEvent } from "./eventApi.js";

const initialState = {
  events: [],
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
      .addCase(registerEvent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerEvent.fulfilled, (state, action) => {
        state.status = "success";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(registerEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

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
  },
});

export default eventSlice.reducer;
