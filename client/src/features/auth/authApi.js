import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";
import { register  } from "./authSlice.js";
import toast from "react-hot-toast";



export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async(formData , {rejectWithValue}) => {
        try {
            const res = await axios.post("/auth/register", formData, 
                {withCredentials : true})
            toast.success("Register Successfully")
                return res.data;
        } catch (error) {
            toast.error("Registration failed")
            return rejectWithValue(error.response?.data?.message || "Registration failed")  
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(formData, {rejectWithValue}) => {
        try {
            const res = await axios.post("/auth/login", formData,
                {withCredentials:true})
                toast.success("Login successfully")
                return res.data;
        } catch (error) {
            toast.error("Login failed")
            return rejectWithValue(error.response?.data?.message || "Login failed")
        }
    }
)

export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async(_ , {rejectWithValue}) => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const res = await api.post("/auth/refresh", {refreshToken});
        
            localStorage.setItem("token", res.data.accessToken);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Token refreh failed");
        }
    }
)