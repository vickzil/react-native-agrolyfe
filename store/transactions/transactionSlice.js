import { createSlice } from "@reduxjs/toolkit";
import { getTransactionsInfo } from "./actions";

const initialState = {
  transactions: null,
  error: false,
  loading: true,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    saveUserTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
  },
  extraReducers: {
    [getTransactionsInfo.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },

    [getTransactionsInfo.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log("transaction ", action.payload.data);
        state.transactions = result.data;
      }

      state.error = false;
      state.loading = false;
    },

    [getTransactionsInfo.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },
  },
});

export const { saveUserTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
