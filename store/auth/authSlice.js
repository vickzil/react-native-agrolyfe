import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // baseURL:
  //   process.env.REACT_APP_BASEURL ||
  //   "https://test-server2-fasta.herokuapp.com/api",
  RequestId: "001web001web" + Math.floor(Math.random() * 10),
  secretKey: "helloworld",
  user: null,
  token: null,
  hasLogin: false,
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
  },
});

export const { saveUserInfo, setToken, setHasLogin } = authSlice.actions;

export default authSlice.reducer;
