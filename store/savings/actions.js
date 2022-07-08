import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserSavings = createAsyncThunk("savings/getUserSavings", async (payload, { getState }) => {
  const baseURL = getState().oauth.baseURL;
  const AppId = getState().oauth.AppId;
  const RequestId = getState().oauth.RequestId;
  const bearerToken = getState().oauth.bearerToken;

  let newPayload = {
    AppId,
    RequestId,
    UserCode: payload,
    pageNumber: 1,
    pageSize: 40,
  };

  return fetch(`${baseURL}/v1.0/UserSavings/getUserSavings`, {
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

export const getSavingsMainCategories = createAsyncThunk(
  "savings/getSavingsMainCategories",
  async (payload, { getState }) => {
    const baseURL = getState().oauth.baseURL;
    const AppId = getState().oauth.AppId;
    const RequestId = getState().oauth.RequestId;
    const bearerToken = getState().oauth.bearerToken;

    let newPayload = {
      AppId,
      RequestId,
      UserCode: payload,
    };

    return fetch(`${baseURL}/v1.0/SavingsMainCategory/getSavingMainCategoriesInfo`, {
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
