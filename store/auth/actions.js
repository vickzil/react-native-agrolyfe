import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getAccountMangager } from "../accountManager/actions";
// import { getAllUserBankAccounts } from "../bank/actions";
// import { fetchAllInvestment, getMyInvestments } from "../products/actions";
// import { getUserReferrals } from "../referrals/actions";
// import { getSavingsMainCategories, getUserSavings } from "../savings/actions";
// import { getTransactionsInfo } from "../transactions/actions";
// import { getUserWalletBalance, getWalletOptions } from "../wallet/actions";

export const getUserInfo = createAsyncThunk("oauth/getUserInfo", async (payload, { getState, dispatch }) => {
  const user = getState().oauth.user;
  const baseURL = getState().oauth.baseURL;
  const AppId = getState().oauth.AppId;
  const RequestId = getState().oauth.RequestId;
  const bearerToken = getState().oauth.bearerToken;

  let newPayload = {
    AppId,
    RequestId,
    UserCode: payload,
  };

  // dispatch(getCountryInfo("NG"));
  // dispatch(fetchAllInvestment(user?.code));
  // dispatch(getMyInvestments(user?.code));
  // dispatch(getUserSavings(user?.code));
  // dispatch(getSavingsMainCategories(user?.code));
  // dispatch(getUserReferrals(user?.code));
  // dispatch(getAccountMangager(user?.code));
  // dispatch(getAllUserBankAccounts(user?.code));
  // dispatch(getTransactionsInfo(user?.code));
  // dispatch(getUserWalletBalance(user?.code));
  // dispatch(getWalletOptions(user?.code));

  return fetch(`${baseURL}/v1.0/Dashboard/getUserInfo`, {
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

export const getCountryInfo = createAsyncThunk("oauth/getCountryInfo", async (payload, { getState }) => {
  const baseURL = getState().oauth.baseURL;
  const AppId = getState().oauth.AppId;
  const RequestId = getState().oauth.RequestId;
  const bearerToken = getState().oauth.bearerToken;

  let newPayload = {
    AppId,
    RequestId,
    Country: payload,
  };

  return fetch(`${baseURL}/v1.0/Dashboard/getCountryInfo`, {
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
