import { createSlice } from "@reduxjs/toolkit";
import { getAccountMangager } from "./actions";

const initialState = {
  accountManager: null,
  error: false,
  loading: false,
};

const accountManagerSlice = createSlice({
  name: "accountManager",
  initialState,
  reducers: {},
  extraReducers: {
    [getAccountMangager.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
      console.log("here");
    },

    [getAccountMangager.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        console.log(action.payload.data);
        state.accountManager = result.data;
      }

      state.error = false;
      state.loading = false;
    },

    [getAccountMangager.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },
  },
});

export default accountManagerSlice.reducer;
