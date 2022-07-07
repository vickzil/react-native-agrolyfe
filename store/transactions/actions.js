import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTransactionsInfo = createAsyncThunk(
  "transactions/getTransactionsInfo",
  async (payload, { getState }) => {
    const baseURL = getState().oauth.baseURL;
    const AppId = getState().oauth.AppId;
    const RequestId = getState().oauth.RequestId;
    const bearerToken = getState().oauth.bearerToken;

    let newPayload = {
      AppId,
      RequestId,
      UserCode: payload,
      TransactionType: "",
      PageSize: 20,
    };

    return fetch(`${baseURL}/v1.0/Wallet/getUserTransactionInfo`, {
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
