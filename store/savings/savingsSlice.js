import { createSlice } from "@reduxjs/toolkit";
import { getUserSavings, getSavingsMainCategories } from "./actions";

const initialState = {
  mySavings: null,
  SavingsCategories: null,
  error: false,
  loading: true,
  catError: false,
  catLoading: true,

  selectedSavingsType: null,
  selectedSavingsTypeDetails: null,
};

const savingsSlice = createSlice({
  name: "savings",
  initialState,
  reducers: {
    setMySavings: (state, { payload }) => {
      state.mySavings = payload;
    },

    setSavingsCategories: (state, { payload }) => {
      state.SavingsCategories = payload;
    },

    setSelectedSavingsType: (state, { payload }) => {
      state.selectedSavingsType = payload;
    },

    setSelectedSavingsTypeDetails: (state, { payload }) => {
      state.selectedSavingsTypeDetails = payload;
    },
  },
  extraReducers: {
    [getUserSavings.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },

    [getUserSavings.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log("savings ", action.payload?.data);
        state.mySavings = result?.data?.data;
      }

      state.error = false;
      state.loading = false;
    },

    [getUserSavings.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },

    [getSavingsMainCategories.pending]: (state, action) => {
      state.catLoading = true;
      state.catError = false;
    },

    [getSavingsMainCategories.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log("SavingsCategories ", action.payload?.data);
        state.SavingsCategories = result?.data;
      }

      state.catError = false;
      state.catLoading = false;
    },

    [getSavingsMainCategories.rejected]: (state) => {
      state.catError = true;
      state.catLoading = false;
    },
  },
});

export const { setSelectedSavingsType, setSelectedSavingsTypeDetails, setSavingsCategories, setMySavings } =
  savingsSlice.actions;

export default savingsSlice.reducer;
