import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserWalletBalance = createAsyncThunk("wallet/getUserWalletBalance", async (payload, { getState }) => {
  const baseURL = getState().oauth.baseURL;
  const AppId = getState().oauth.AppId;
  const RequestId = getState().oauth.RequestId;
  const bearerToken = getState().oauth.bearerToken;

  let newPayload = {
    AppId,
    RequestId,
    UserCode: payload,
  };

  const response = await fetch(`${baseURL}/v1.0/Dashboard/userWalletBalance`, {
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

export const getWalletOptions = createAsyncThunk("wallet/getWalletOptions", async (payload, { getState }) => {
  const baseURL = getState().oauth.baseURL;
  const AppId = getState().oauth.AppId;
  const RequestId = getState().oauth.RequestId;
  const bearerToken = getState().oauth.bearerToken;

  let newPayload = {
    AppId,
    RequestId,
    UserCode: payload,
  };

  const response = await fetch(`${baseURL}/v1.0/Dashboard/getWalletFundingOptions`, {
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

// export const insertUserCard = createAsyncThunk("wallet/insertUserCard", async (payload, { getState }) => {
//   const user = getState().oauth.user;
//   const baseURL = getState().oauth.baseURL;
//   const AppId = getState().oauth.AppId;
//   const RequestId = getState().oauth.RequestId;
//   const bearerToken = getState().oauth.bearerToken;

//   let newPayload = {
//     AppId,
//     RequestId,
//     UserCode: user?.code,
//     ProviderCardReference: payload,
//     Provider: "paystack",
//     Amount: 100,
//     Currency: "NGN",
//   };

//   return fetch(`${baseURL}/v1.0/UserCard/insertUserCard`, {
//     method: "POST",
//     mode: "cors",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + bearerToken,
//     },

//     body: JSON.stringify(newPayload),
//   }).then((res) => res.json());
// });
