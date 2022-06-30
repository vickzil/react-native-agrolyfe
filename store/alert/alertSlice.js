import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: {
    status: false,
    message: "",
  },
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
  fundwalletByLocalTransferModal: false,
  fundwalletByForeignTransferModal: false,
  payBillsModal: false,
  transferModal: false,
  editProfileModal: false,
  nextOfKinModal: false,
  accountManagerModal: false,
  bvnModal: false,
  antiPhizingModal: false,
  changePasswordModal: false,
  changePinModal: false,
  selectedCountry: null,
  selectedBank: null,
  selectedUser: null,
  countryModal: {
    status: false,
    type: "",
    selected: "",
    payload: null,
  },

  selectBankModal: {
    status: false,
    type: "",
  },
  transferToBankModal: {
    status: false,
    bank: null,
  },
  transferToCustomerModal: {
    status: false,
    user: null,
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = {
        status: payload.status,
        message: payload.message,
      };
    },

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
    setCountryModal: (state, { payload }) => {
      state.countryModal = {
        status: payload.status,
        selected: payload.selected,
        type: payload.type,
        payload: payload.payload,
      };
    },
    setSelectBankModal: (state, { payload }) => {
      state.selectBankModal = {
        status: payload.status,
        type: payload.type,
      };
    },

    setFundwalletModal: (state, { payload }) => {
      state.fundwalletModal = payload;
    },

    setFundwalletByLocalTransferModal: (state, { payload }) => {
      state.fundwalletByLocalTransferModal = payload;
    },
    setFundwalletByForeignTransferModal: (state, { payload }) => {
      state.fundwalletByForeignTransferModal = payload;
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
    setNextOfKinModal: (state, { payload }) => {
      state.nextOfKinModal = payload;
    },
    setAccountManagerModal: (state, { payload }) => {
      state.accountManagerModal = payload;
    },
    setBvnModal: (state, { payload }) => {
      state.bvnModal = payload;
    },

    setAntiPhizingModal: (state, { payload }) => {
      state.antiPhizingModal = payload;
    },

    setChangePasswordModal: (state, { payload }) => {
      state.changePasswordModal = payload;
    },
    setChangePinModal: (state, { payload }) => {
      state.changePinModal = payload;
    },

    setSelectedCountry: (state, { payload }) => {
      state.selectedCountry = payload;
    },

    setSelectedBank: (state, { payload }) => {
      state.selectedBank = payload;
    },
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
    setTransferToBankModal: (state, { payload }) => {
      state.transferToBankModal = {
        status: payload.status,
        bank: payload.bank,
      };
    },
    setTransferToCustomerModal: (state, { payload }) => {
      state.transferToCustomerModal = {
        status: payload.status,
        user: payload.user,
      };
    },
  },
});

export const {
  setLoading,
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
  setFundwalletByLocalTransferModal,
  setFundwalletByForeignTransferModal,
  setPayBillsModal,
  setTransferModal,
  setEditProfileModal,
  setNextOfKinModal,
  setAccountManagerModal,
  setBvnModal,
  setAntiPhizingModal,
  setChangePasswordModal,
  setChangePinModal,
  setCountryModal,
  setSelectedCountry,
  setSelectBankModal,
  setSelectedBank,
  setTransferToBankModal,
  setSelectedUser,
  setTransferToCustomerModal,
} = alertSlice.actions;

export default alertSlice.reducer;
