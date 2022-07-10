import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, getCountryInfo, resendUserTransactionPin } from "./actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  resendPinLoading: false,
  resendPinCompleted: false,
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
    },

    [getUserInfo.fulfilled]: (state, action) => {
      let result = action.payload;
      // console.log(action.payload);
      if (result) {
        // console.log(action.payload.data);
        state.user = result.data;
        AsyncStorage.setItem("userData", JSON.stringify(result.data));
      }

      state.error = false;
      state.loading = false;
    },

    [getUserInfo.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },

    [resendUserTransactionPin.pending]: (state, action) => {
      state.resendPinLoading = true;
      state.resendPinCompleted = false;
    },

    [resendUserTransactionPin.fulfilled]: (state, action) => {
      state.resendPinLoading = false;
      state.resendPinCompleted = true;
      console.log(action.payload);
    },

    [resendUserTransactionPin.rejected]: (state) => {
      state.resendPinLoading = false;
      state.resendPinCompleted = false;
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
