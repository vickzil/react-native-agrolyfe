import { createSlice } from "@reduxjs/toolkit";
import {
  getUserInfo,
  getCountryInfo,
  resendUserTransactionPin,
  getDashBoardNotification,
  getAdverts,
  getAuthentication,
} from "./actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  baseURL: "https://oxfordvestapi.azurewebsites.net/api",
  walletURL: "https://oxfordwalletapi.azurewebsites.net/api",
  AppId: "agrolyfe",
  APPVERSION: "1.0.2",
  RequestId: "001web001web" + Math.floor(Math.random() * 10),
  secretKey: "helloworld",
  bearerToken: "",
  user: null,
  loginIdentity: null,
  countryInfo: null,
  token: null,
  hasLogin: false,
  darkMode: false,
  hasFeedBack: false,
  error: false,
  loading: false,
  resendPinLoading: false,
  resendPinCompleted: false,
  greetings: "",
  paystackRef: null,
  verificationInfo: null,
  dashboardMessage: null,
  adverts: null,
  selectedMenu: "Home",
  showBalances: true,
  agreeTerms: false,
  refreshing: false,
  theme: "light",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserInfo: (state, { payload }) => {
      state.user = payload;
    },

    SaveLoginIdentity: (state, { payload }) => {
      state.loginIdentity = payload;
    },

    setToken: (state, { payload }) => {
      state.token = payload;
    },

    setHasLogin: (state, { payload }) => {
      state.hasLogin = payload;
    },

    setDarkMode: (state, { payload }) => {
      state.darkMode = payload;
    },

    setBearerToken: (state, { payload }) => {
      state.bearerToken = payload;
    },

    setGreetings: (state, { payload }) => {
      state.greetings = payload;
    },

    setResendPinCompleted: (state, { payload }) => {
      state.resendPinCompleted = payload;
    },

    setPaystackRef: (state, { payload }) => {
      state.paystackRef = payload;
    },

    setVerificationInfo: (state, { payload }) => {
      state.verificationInfo = payload;
    },

    setDashboardMessage: (state, { payload }) => {
      state.dashboardMessage = payload;
    },

    setAdverts: (state, { payload }) => {
      state.adverts = payload;
    },

    setHasFeedBack: (state, { payload }) => {
      state.hasFeedBack = payload;
    },

    setSelectedMenu: (state, { payload }) => {
      state.selectedMenu = payload;
    },

    setShowBalances: (state, { payload }) => {
      state.showBalances = payload;
    },

    setAgreeTerms: (state, { payload }) => {
      state.agreeTerms = payload;
    },

    setTheme: (state, { payload }) => {
      state.theme = payload;
    },

    setRefreshing: (state, { payload }) => {
      state.refreshing = payload;
    },
  },
  extraReducers: {
    [getAuthentication.fulfilled]: (state, action) => {
      let result = action.payload;
      // console.log("user", action.payload);
      if (result) {
        let appToken = result?.value?.token;
        state.bearerToken = appToken;
      }
    },

    [getUserInfo.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },

    [getUserInfo.fulfilled]: (state, action) => {
      let result = action.payload;
      // console.log("user", action.payload);
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
      // console.log(action.payload);
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
    [getDashBoardNotification.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log(action.payload.data);
        state.dashboardMessage = result.data;
      }
    },

    [getAdverts.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log(action.payload.data);
        state.adverts = result.data;
      }
    },
  },
});

export const {
  saveUserInfo,
  setToken,
  setHasLogin,
  setDarkMode,
  setBearerToken,
  setGreetings,
  setResendPinCompleted,
  setPaystackRef,
  setVerificationInfo,
  setDashboardMessage,
  setAdverts,
  SaveLoginIdentity,
  setHasFeedBack,
  setSelectedMenu,
  setShowBalances,
  setAgreeTerms,
  setTheme,
  setRefreshing,
} = authSlice.actions;

export default authSlice.reducer;
