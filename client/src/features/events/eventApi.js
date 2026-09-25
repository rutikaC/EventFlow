import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../services/api.js";


export const registerEvent = createAsyncThunk(
    "event/registerEvent",
    async(formData, {rejectWithValue}) => {
        try {
            const res = await axios.post("/event/register", formData,
                {withCredentials:true})
                toast.success("Event Registered successfully")
                return res.data;
        } catch (error) {
            toast.error("Event registration failed");
            return rejectWithValue(error.response?.data?.message || "Event registration failed")
        }
    }
)

export const getEvents = createAsyncThunk(
    "events/getEvents",
    async(_ , {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            console.log("token", token);
            const res = await api.get("/event/list",{
                headers:{
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true});
                 console.log("data" , res.data);
                 return res.data;

        } catch (error) {
            console.log("fetch data error" , error);
            return rejectWithValue(error.response?.data?.message || "Failed to Fetch")
        }
    }
)

export const getEventById = createAsyncThunk(
    "events/getEventByI",
    async( eventId, {rejectWithValue}) => {
       try {
         const token = localStorage.getItem("token");
 
         const res = await api.get(`/event/${eventId}`, {
             headers:{
                 Authorization: `Bearer ${token}`
             },
         withCredentials: true});
         return res.data;
       } catch (error) {
          console.log("fetch data error" , error);
            return rejectWithValue(error.response?.data?.message || "Failed to get event")
       }
    }
)