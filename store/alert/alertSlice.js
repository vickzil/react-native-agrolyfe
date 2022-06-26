import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProductModal: false,
  myPurchasesModal: false,
  productDetailsModal: {
    status: false,
    payload: null,
  },
  purchaseDetailsModal: {
    status: false,
    payload: null,
  },
  bankModal: false,
  cardModal: false,
  transactionModal: false,
  savingsModal: false,
  subCategorySavingsModal: {
    status: false,
    payload: null,
  },
  referralModal: false,
  referralDetailsModal: {
    status: false,
    payload: null,
  },
  transactionDetailsModal: {
    status: false,
    payload: null,
  },
  fundwalletModal: false,
  payBillsModal: false,
  transferModal: false,
  editProfileModal: true,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAllProductModal: (state, { payload }) => {
      state.allProductModal = payload;
    },

    setMyPurchasesModal: (state, { payload }) => {
      state.myPurchasesModal = payload;
    },

    setBankModal: (state, { payload }) => {
      state.bankModal = payload;
    },

    setCardModal: (state, { payload }) => {
      state.cardModal = payload;
    },

    setTransactionModal: (state, { payload }) => {
      state.transactionModal = payload;
    },

    setSavingsModal: (state, { payload }) => {
      state.savingsModal = payload;
    },

    setSubCategorySavingsModal: (state, { payload }) => {
      state.subCategorySavingsModal = {
        status: payload.status,
        payload: payload.payload,
      };
    },

    setTransactionDetailsModal: (state, { payload }) => {
      state.transactionDetailsModal = {
        status: payload.status,
        payload: payload.payload,
      };
    },

    setProductDetailsModal: (state, { payload }) => {
      state.productDetailsModal = {
        status: payload.status,
        payload: payload.payload,
      };
    },

    setPurchaseDetailsModal: (state, { payload }) => {
      state.purchaseDetailsModal = {
        status: payload.status,
        payload: payload.payload,
      };
    },

    setReferralModal: (state, { payload }) => {
      state.referralModal = payload;
    },

    setReferralDetailsModal: (state, { payload }) => {
      state.referralDetailsModal = {
        status: payload.status,
        payload: payload.payload,
      };
    },

    setFundwalletModal: (state, { payload }) => {
      state.fundwalletModal = payload;
    },

    setPayBillsModal: (state, { payload }) => {
      state.payBillsModal = payload;
    },

    setTransferModal: (state, { payload }) => {
      state.transferModal = payload;
    },
    setEditProfileModal: (state, { payload }) => {
      state.editProfileModal = payload;
    },
  },
});

export const {
  setAllProductModal,
  setMyPurchasesModal,
  setBankModal,
  setCardModal,
  setTransactionModal,
  setSavingsModal,
  setSubCategorySavingsModal,
  setReferralModal,
  setTransactionDetailsModal,
  setProductDetailsModal,
  setPurchaseDetailsModal,
  setReferralDetailsModal,
  setFundwalletModal,
  setPayBillsModal,
  setTransferModal,
  setEditProfileModal,
} = alertSlice.actions;

export default alertSlice.reducer;
