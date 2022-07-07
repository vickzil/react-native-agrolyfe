import { createSlice } from "@reduxjs/toolkit";
import { fetchAllInvestment, getMyInvestments } from "./actions";

const initialState = {
  products: null,
  myProducts: null,
  error: false,
  loading: true,
  myError: false,
  myLoading: true,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllInvestment.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },

    [fetchAllInvestment.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log("products ", action.payload.data);
        state.products = result.data;
      }

      state.error = false;
      state.loading = false;
    },

    [fetchAllInvestment.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },

    [getMyInvestments.pending]: (state, action) => {
      state.myLoading = true;
      state.myError = false;
    },

    [getMyInvestments.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        console.log("Myproducts ", action.payload.data);
        state.myProducts = result.data;
      }

      state.myError = false;
      state.myLoading = false;
    },

    [getMyInvestments.rejected]: (state) => {
      state.myError = true;
      state.myLoading = false;
      // logout();
    },
  },
});

export default productSlice.reducer;
