import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUserBankAccounts = createAsyncThunk("bank/getAllUserBankAccounts", async (payload, { getState }) => {
  const baseURL = getState().oauth.baseURL;
  const AppId = getState().oauth.AppId;
  const RequestId = getState().oauth.RequestId;
  const bearerToken = getState().oauth.bearerToken;

  let newPayload = {
    AppId,
    RequestId,
    UserCode: payload,
  };

  // console.log(JSON.stringify(newPayload));

  const response = await fetch(`${baseURL}/v1.0/UserBankAccount/getAllUserBankAccounts`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + bearerToken,
    },

    body: JSON.stringify(newPayload),
  }).then((res) => {
    return res.json();
  });

  return response;
});
