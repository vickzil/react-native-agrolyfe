import { createSlice } from "@reduxjs/toolkit";
import { getUserReferrals } from "./actions";

const initialState = {
  referrals: null,
  error: false,
  loading: true,
};

const referralSlice = createSlice({
  name: "referrals",
  initialState,
  reducers: {
    setReferrals: (state, { payload }) => {
      state.referrals = payload;
    },
  },
  extraReducers: {
    [getUserReferrals.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },

    [getUserReferrals.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log("referrals ", action.payload.data);
        state.referrals = result.data;
      }

      state.error = false;
      state.loading = false;
    },

    [getUserReferrals.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },
  },
});

export const { setReferrals } = referralSlice.actions;
export default referralSlice.reducer;
