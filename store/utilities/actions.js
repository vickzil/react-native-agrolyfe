import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAirtimeDataProvidersPlans = createAsyncThunk(
  "utility/getAirtimeDataProvidersPlans",
  async (payload, { getState }) => {
    const baseURL = getState().oauth.baseURL;
    const AppId = getState().oauth.AppId;
    const RequestId = getState().oauth.RequestId;
    const bearerToken = getState().oauth.bearerToken;

    let newPayload = {
      AppId,
      RequestId,
    };

    // console.log(JSON.stringify(newPayload));

    return fetch(`${baseURL}/v1.0/UtilityPayment/getAirtimeDataProvidersPlans`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },

      body: JSON.stringify(newPayload),
    }).then((res) => res.json());
  },
);

export const getCableTVProviders = createAsyncThunk("utility/getCableTVProviders", async (payload, { getState }) => {
  const baseURL = getState().oauth.baseURL;
  const AppId = getState().oauth.AppId;
  const RequestId = getState().oauth.RequestId;
  const bearerToken = getState().oauth.bearerToken;

  let newPayload = {
    AppId,
    RequestId,
  };

  // console.log(JSON.stringify(newPayload));

  return fetch(`${baseURL}/v1.0/UtilityPayment/getCableTVProviders`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + bearerToken,
    },

    body: JSON.stringify(newPayload),
  }).then((res) => res.json());
});
