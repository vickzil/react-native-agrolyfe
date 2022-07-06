import { createSlice } from "@reduxjs/toolkit";
import { getAuthentication } from "./actions";

const initialState = {
  baseURL: "https://oxfordvestapi.azurewebsites.net/api",
  AppId: "agrolyfe",
  APPVERSION: "1.1.3",
  RequestId: "001web001web" + Math.floor(Math.random() * 10),
  secretKey: "helloworld",
  bearerToken: "",
  user: null,
  token: null,
  hasLogin: false,
  error: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserInfo: (state, { payload }) => {
      state.user = payload;
    },

    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setHasLogin: (state, { payload }) => {
      state.hasLogin = payload;
    },

    setBearerToken: (state, { payload }) => {
      state.bearerToken = payload;
    },
  },
  extraReducers: {
    [getAuthentication.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
      console.log("here");
    },

    [getAuthentication.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.error = false;
      state.loading = false;
    },

    [getAuthentication.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },
  },
});

export const { saveUserInfo, setToken, setHasLogin, setBearerToken } = authSlice.actions;

export default authSlice.reducer;
