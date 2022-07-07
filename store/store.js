import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import alertSlice from "./alert/alertSlice";
import accountManagerSlice from "./accountManager/accountManagerSlice";
import walletSlice from "./wallet/walletSlice";
import bankSlice from "./bank/bankSlice";
import transactionSlice from "./transactions/transactionSlice";
import productSlice from "./products/productSlice";

export const store = configureStore({
  reducer: {
    oauth: authSlice,
    alert: alertSlice,
    accountManager: accountManagerSlice,
    wallet: walletSlice,
    bank: bankSlice,
    transactions: transactionSlice,
    products: productSlice,
  },
});
