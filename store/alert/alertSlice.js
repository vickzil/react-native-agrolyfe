import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertModalSuccess: {
    status: false,
    payload: null,
  },
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
  addBankModal: false,
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
  paymentEvidenceModal: false,
  payBillsModal: false,
  buyAirtimeModal: false,
  dataSubscriptionModal: false,
  cableSubscriptionModal: false,
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
  selectedNetwork: null,
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
    setAlertModalSuccess: (state, { payload }) => {
      state.alertModalSuccess = {
        status: payload.status,
        payload: payload.payload,
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

    setAddBankModal: (state, { payload }) => {
      state.addBankModal = payload;
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

    setPaymentEvidenceModal: (state, { payload }) => {
      state.paymentEvidenceModal = payload;
    },

    setPayBillsModal: (state, { payload }) => {
      state.payBillsModal = payload;
    },

    setBuyAirtimeModalModal: (state, { payload }) => {
      state.buyAirtimeModal = payload;
    },

    setDataSubscriptionModal: (state, { payload }) => {
      state.dataSubscriptionModal = payload;
    },

    setCableSubscriptionModal: (state, { payload }) => {
      state.cableSubscriptionModal = payload;
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

    setDefaultBank: (state, { payload }) => {
      state.defaultBank = payload;
    },

    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload;
    },

    setSelectedNetwork: (state, { payload }) => {
      state.selectedNetwork = payload;
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
  setAlertModalSuccess,
  setAllProductModal,
  setMyPurchasesModal,
  setBankModal,
  setAddBankModal,
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
  setPaymentEvidenceModal,
  setPayBillsModal,
  setBuyAirtimeModalModal,
  setDataSubscriptionModal,
  setCableSubscriptionModal,
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
  setDefaultBank,
  setTransferToBankModal,
  setSelectedUser,
  setSelectedNetwork,
  setTransferToCustomerModal,
} = alertSlice.actions;

export default alertSlice.reducer;
