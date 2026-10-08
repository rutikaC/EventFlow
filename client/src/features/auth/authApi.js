import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../services/api.js";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", formData, {
        withCredentials: true,
      });
      toast.success("Register Successfully");
      return res.data;
    } catch (error) {
      toast.error("Registration failed");
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", formData, {
        withCredentials: true,
      });
      toast.success("Login successfully");
      console.log("res", res);
      return res.data;
    } catch (error) {
      toast.error("Login failed");
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

