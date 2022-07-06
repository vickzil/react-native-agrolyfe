import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../components/helpers/axiosInstance";

export const getAuthentication = createAsyncThunk("oauth/getAuthentication", async (payload, { getState }) => {
  const AppId = getState().oauth.AppId;
  const secretKey = getState().oauth.secretKey;
  console.log("here");
  return axiosInstance
    .post(`/v1.0/Authenticate/authenticateEndpoints`, {
      AppId: AppId,
      Secret: secretKey,
    })
    .then((response) => {
      return response;
    });
});
