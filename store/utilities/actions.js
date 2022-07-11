import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountMangager } from "../accountManager/actions";
import { logoutAllAccount2 } from "../alert/actions";
import { logoutAllAccount } from "../auth/actions";
import { getAllUserBankAccounts } from "../bank/actions";
import { fetchAllInvestment, getMyInvestments } from "../products/actions";
import { getUserReferrals } from "../referrals/actions";
import { getSavingsMainCategories, getUserSavings } from "../savings/actions";
import { getTransactionsInfo } from "../transactions/actions";
import { getWalletOptions } from "../wallet/actions";

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

    const response = await fetch(`${baseURL}/v1.0/UtilityPayment/getAirtimeDataProvidersPlans`, {
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

  const response = await fetch(`${baseURL}/v1.0/UtilityPayment/getCableTVProviders`, {
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

export const otherFunctions = createAsyncThunk("util/otherFunctions", async (payload, { getState, dispatch }) => {
  const user = getState().oauth.user;
  const bearerToken = getState().oauth.bearerToken;

  if (!bearerToken) {
    dispatch(logoutAllAccount());
    dispatch(logoutAllAccount2());
    return;
  }

  dispatch(fetchAllInvestment(user?.code));
  dispatch(getMyInvestments(user?.code));
  dispatch(getUserSavings(user?.code));
  dispatch(getSavingsMainCategories(user?.code));
  dispatch(getUserReferrals(user?.code));
  dispatch(getAccountMangager(user?.code));
  dispatch(getAllUserBankAccounts(user?.code));
  dispatch(getUserWalletBalance(user?.code));
  dispatch(getWalletOptions(user?.code));
  dispatch(getAirtimeDataProvidersPlans(user?.code));
  dispatch(getCableTVProviders(user?.code));

  console.log("here");
});

export const otherGlobalFunctions = createAsyncThunk(
  "util/otherGlobalFunctions",
  async (payload, { getState, dispatch }) => {
    const user = getState().oauth.user;

    dispatch(getTransactionsInfo(user?.code));
    dispatch(fetchAllInvestment(user?.code));
    dispatch(getMyInvestments(user?.code));
    dispatch(getUserSavings(user?.code));
    dispatch(getSavingsMainCategories(user?.code));
    dispatch(getUserReferrals(user?.code));
    dispatch(getAccountMangager(user?.code));
    dispatch(getAllUserBankAccounts(user?.code));
    dispatch(getUserWalletBalance(user?.code));
    dispatch(getWalletOptions(user?.code));
    dispatch(getAirtimeDataProvidersPlans(user?.code));
    dispatch(getCableTVProviders(user?.code));
  },
);
