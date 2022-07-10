import { createSlice } from "@reduxjs/toolkit";
import { getUserWalletBalance, getWalletOptions } from "./actions";

const initialState = {
  userWalletBalance: null,
  walletOptions: null,
  optionError: false,
  optionLoading: true,
  error: false,
  loading: true,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setUserWalletBalance: (state, { payload }) => {
      state.userWalletBalance = payload;
    },

    setWalletOptions: (state, { payload }) => {
      state.walletOptions = payload;
    },
  },
  extraReducers: {
    [getUserWalletBalance.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },

    [getUserWalletBalance.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log(action);
        state.userWalletBalance = result.data;
      }

      state.error = false;
      state.loading = false;
    },

    [getUserWalletBalance.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },

    [getWalletOptions.pending]: (state, action) => {
      state.optionLoading = true;
      state.optionError = false;
    },

    [getWalletOptions.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log(action.payload.data);
        state.walletOptions = result.data;
      }

      state.optionError = false;
      state.optionLoading = false;
    },

    [getWalletOptions.rejected]: (state) => {
      state.optionError = true;
      state.optionLoading = false;
      // logout();
    },
  },
});

export const { setUserWalletBalance, setWalletOptions } = walletSlice.actions;

export default walletSlice.reducer;
