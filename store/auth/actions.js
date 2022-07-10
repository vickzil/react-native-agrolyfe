import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUserBankAccount } from "../bank/bankSlice";
import { setMyProducts } from "../products/productSlice";
import { setReferrals } from "../referrals/referralSlice";
import { setMySavings } from "../savings/savingsSlice";
import { saveUserTransactions } from "../transactions/transactionSlice";
import { setUserWalletBalance } from "../wallet/walletSlice";

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

export const resendUserTransactionPin = createAsyncThunk(
  "oauth/resendUserTransactionPin",
  async (payload, { getState }) => {
    const baseURL = getState().oauth.baseURL;
    const AppId = getState().oauth.AppId;
    const RequestId = getState().oauth.RequestId;
    const bearerToken = getState().oauth.bearerToken;
    const user = getState().oauth.user;

    let newPayload = {
      AppId,
      RequestId,
      UserCode: user.code,
    };

    return fetch(`${baseURL}/v1.0/OAuth/resendTransactionPIN`, {
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

export const logoutAllAccount = createAsyncThunk("oauth/logoutAccount", async (payload, { dispatch }) => {
  dispatch(setUserWalletBalance(null));
  dispatch(setMySavings(null));
  dispatch(setReferrals(null));
  dispatch(setMyProducts(null));
  dispatch(setUserBankAccount(null));
  dispatch(saveUserTransactions(null));
});
