import axios from "../../services/api";
import { refreshAccessToken, authFailure, logout } from "./authSlice";

export const refreshToken = () => async (dispatch, getState) => {
  try {
    const { refreshToken } = getState().auth;
    const res = await axios.post("/auth/refresh", { refreshToken });
    dispatch(refreshAccessToken({ accessToken: res.data.accessToken }));
  } catch (err) {
    dispatch(authFailure("Token refresh failed"));
    dispatch(logout());
  }
};
