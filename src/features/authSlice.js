import { createSlice } from "@reduxjs/toolkit";
import { storage } from "_constants";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: localStorage.getItem("token") || "",
    user_sent: localStorage.getItem("user_sent") || "",
    err: undefined,
  },
  reducers: {
    cancelLoginFailed: (state) => {
      state.err = undefined;
    },
    login: (state, { payload }) => {
      state.access_token = payload.data.access_token;
      localStorage.setItem("access_token", payload.data.access_token);
      localStorage.setItem("refresh_token", payload.data.refresh_token);
    },
    logout: (state) => {
      state.token = undefined;
      state.user_sent = undefined;
      localStorage.removeItem(storage.token);
      localStorage.removeItem(storage.user_sent);
    },
  },
});

const { reducer } = authSlice;
export const { cancelLoginFailed, logout, login } = authSlice.actions;
export default reducer;
