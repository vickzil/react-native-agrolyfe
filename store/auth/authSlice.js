import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, getCountryInfo } from "./actions";

const initialState = {
  baseURL: "https://oxfordvestapi.azurewebsites.net/api",
  AppId: "agrolyfe",
  APPVERSION: "1.1.3",
  RequestId: "001web001web" + Math.floor(Math.random() * 10),
  secretKey: "helloworld",
  bearerToken: "",
  user: null,
  countryInfo: null,
  token: null,
  hasLogin: false,
  error: false,
  loading: false,
  greetings: "",
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

    setGreetings: (state, { payload }) => {
      state.greetings = payload;
    },
  },
  extraReducers: {
    [getUserInfo.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
      console.log("here");
    },

    [getUserInfo.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        console.log(action.payload.data);
        state.user = result.data;
      }

      state.error = false;
      state.loading = false;
    },

    [getUserInfo.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },

    [getCountryInfo.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log(action.payload.data);
        state.countryInfo = result.data;
      }

      state.error = false;
      state.loading = false;
    },
  },
});

export const { saveUserInfo, setToken, setHasLogin, setBearerToken, setGreetings } = authSlice.actions;

export default authSlice.reducer;
