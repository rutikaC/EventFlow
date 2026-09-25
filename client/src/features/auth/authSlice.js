import { createSlice} from "@reduxjs/toolkit"
import { loginUser, registerUser } from "./authApi";





const initialState = {
    user: null,
    accessToken: localStorage.getItem("token") || null,
    refreshToken:null,
    status: "idle",
    error: null,
};

export const  authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{


    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state, action)=> {
            state.status = "loading",
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.accessToken= action.payload.accessToken;
            localStorage.setItem("token", action.payload.accessToken);
            state.refreshToken= action.payload.refreshToken;
            state.error = action.payload;
        })
        .addCase(registerUser.rejected, (state, action)=> {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(loginUser.pending, (state, action) => {
            state.status = "loading",
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem("token", action.payload.accessToken)
            state.refreshToken = action.payload.refreshToken;
            state.error= action.error;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error= action.payload
        })
    }
})


export const{register} = authSlice.actions
export default authSlice.reducer