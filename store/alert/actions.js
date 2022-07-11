import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveUserInfo, setAdverts, setDashboardMessage, setToken, setVerificationInfo } from "../auth/authSlice";

export const logoutAllAccount2 = createAsyncThunk("oauth/logoutAccount", async (payload, { dispatch }) => {
  dispatch(setToken(""));
  dispatch(saveUserInfo(null));
  dispatch(setVerificationInfo(null));
  dispatch(setDashboardMessage(null));
  dispatch(setAdverts(null));
});
