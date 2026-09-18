import { createSlice} from "@reduxjs/toolkit"


export const registerUser= (userData) => async(dispatch) => {
    try {
        const res = await axios.post(vitebaseurl, userData, {
            withCredentials: true
        });

        dispatch(register({
            user:res.data.user,
            token:res.data.token,
        }))
    } catch (error) {
        dispatch(authFailure(error.response?.data?.message || "Registration failed"))
    }
}

const initialState = {
    user: null,
    token: null,
    status: "idle",
    error: null,
};

export const  authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        register: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.status = "succeeded";
            state.error = null
        }
    }
})


export const{register} = authSlice.actions
export default authSlice.reducer