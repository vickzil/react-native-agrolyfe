import { createSlice } from "@reduxjs/toolkit";
import { getTransactionsInfo } from "./actions";

const initialState = {
  transactions: null,
  error: false,
  loading: true,
};

const bankSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
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

export default bankSlice.reducer;
