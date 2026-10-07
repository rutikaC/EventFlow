import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { create } from "axios";
import toast from "react-hot-toast";
import api from "../../services/api.js";

export const registerEvent = createAsyncThunk(
  "event/registerEvent",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const res = await api.post("/event/register", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // ✅ fixed
        },
      });
      console.log("res", res);
      toast.success("Event Registered successfully");
      return res.data;
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      toast.error("Event registration failed");
      return rejectWithValue(
        error.response?.data?.message || "Event registration failed",
      );
    }
  },
);


export const getMyEvents = createAsyncThunk(
  "events/getMyEvents",
  async(_, {rejectWithValue}) => {
    try {

      const token= localStorage.getItem("token");

      const res = await api.get("/event/my-events",{
        headers:{
          Authorization: `Bearer ${token}`
        },
        withCredentials:true,
      })
      // console.log("res", res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch your events"
      )
    }
  }
)


export const updateEvent =createAsyncThunk(
  "event/updateEvent",
  async({eventId , formData}, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await api.put(`/event/update/${eventId}`, 
        formData, {
        withCredentials:true,
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      toast.success("Event successfully updated")
    } catch (error) {
      console.log(error)
      toast.error("Event update failed");
      return rejectWithValue(
        error?.response?.data?.message ||"Event update failed"
      )
    }
  }
)


export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const res = await api.get("/event/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("data", res.data);
      return res.data;
    } catch (error) {
      console.log("fetch data error", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to Fetch",
      );
    }
  },
);

export const getEventById = createAsyncThunk(
  "events/getEventById",
  async (eventId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log("fetch data error", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to get event",
      );
    }
  },
);


export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async(eventId, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.delete(`/event/delete/${eventId}`, {
        headers:{
          Authorization: `Bearer ${token}`,
        },
        withCredentials:true,
      })
      toast.success("Event deleted successfully")
      console.log("res del", res);
      return res.data;
      
    } catch (error) {
      console.log("delete event error:", error);
      toast.error("Event delete failed!!")
      return rejectWithValue(
        error.response?.data?.message || ""
      )
    }
  }
)