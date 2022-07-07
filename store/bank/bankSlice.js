import { createSlice } from "@reduxjs/toolkit";
import { getAllUserBankAccounts } from "./actions";

const initialState = {
  userBankAccount: null,
  error: false,
  loading: true,
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUserBankAccounts.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },

    [getAllUserBankAccounts.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log("bank ", action.payload.data);
        state.userBankAccount = result.data;
      }

      state.error = false;
      state.loading = false;
    },

    [getAllUserBankAccounts.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },
  },
});

export default bankSlice.reducer;
