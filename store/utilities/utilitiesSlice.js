import { createSlice } from "@reduxjs/toolkit";
import { getAirtimeDataProvidersPlans, getCableTVProviders } from "./actions";

const initialState = {
  airtimeDataProviders: null,
  cableTvProviders: null,
  error: false,
  loading: true,
};

const utilitiesSlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setAirtimeDataProviders: (state, { payload }) => {
      state.airtimeDataProviders = payload;
    },

    setCableTvProviders: (state, { payload }) => {
      state.cableTvProviders = payload;
    },
  },
  extraReducers: {
    [getAirtimeDataProvidersPlans.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },

    [getAirtimeDataProvidersPlans.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log("airtimeDataProviders ", action.payload.data);
        state.airtimeDataProviders = result.data;
      }

      state.error = false;
      state.loading = false;
    },

    [getAirtimeDataProvidersPlans.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },

    [getCableTVProviders.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },

    [getCableTVProviders.fulfilled]: (state, action) => {
      let result = action.payload;
      if (result) {
        // console.log("cableTvProviders ", action.payload.data);
        state.cableTvProviders = result.data;
      }

      state.error = false;
      state.loading = false;
    },

    [getCableTVProviders.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      // logout();
    },
  },
});

export const { setAirtimeDataProviders, setCableTvProviders } = utilitiesSlice.actions;
export default utilitiesSlice.reducer;
