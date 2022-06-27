import { StyleSheet, Text, View } from "react-native";
import React from "react";

import ProductsModal from "./products/ProductsModal";
import BankModal from "./bank/BankModal";
import CardModal from "./cards/CardModal";
import TransactionModal from "./transactions/TransactionModal";
import SavingsModal from "./savings/SavingsModal";
import SubSavingsModal from "./savings/SubSavingsModal";
import ReferralModal from "./referrals/ReferralModal";
import TransactionDetailsModal from "./transactions/TransactionDetailsModal";
import ProductDetailsModal from "./products/ProductDetailsModal";
import PurchaseDetailsModal from "./products/PurchaseDetailsModal";
import ReferralDetailsModal from "./referrals/ReferralDetailsModal";
import FundWalletModal from "./fundwallet/FundWalletModal";
import PayBillsModal from "./billspayment/PayBillsModal";
import EditProfileModal from "./profile/editProfile/EditProfileModal";
import NextOfKinModal from "./profile/nextofkin/NextOfKinModal";
import AccountManagerModal from "./profile/accountManager/AccountManagerModal";
import BvnModal from "./profile/bvn/BvnModal";
import AntiPhizingModal from "./profile/antiPhizing/AntiPhizingModal";
import ChangePasswordModal from "./profile/changePassword/ChangePasswordModal";
import ChangePinModal from "./profile/changePin/ChangePinModal";
import CountryPopUp from "./CountryPopUp";
import SelectBankModal from "./bank/SelectBankModal";
import TransferToBankModal from "./transfer/TransferToBank";
// import TransferModalButtom from "./transfer/TransferModalButtom";

const AllModals = () => {
  return (
    <>
      <ProductsModal />
      <BankModal />
      <CardModal />
      <TransactionModal />
      <SavingsModal />
      <SubSavingsModal />
      <ReferralModal />
      <ReferralDetailsModal />
      <TransactionDetailsModal />
      <ProductDetailsModal />
      <PurchaseDetailsModal />
      <FundWalletModal />
      <PayBillsModal />
      <EditProfileModal />
      <NextOfKinModal />
      <AccountManagerModal />
      <BvnModal />
      <AntiPhizingModal />
      <ChangePasswordModal />
      <ChangePinModal />
      <CountryPopUp />
      <SelectBankModal />
      <TransferToBankModal />
      {/* <TransferModalButtom /> */}
      {/* <MyPurchasesModal /> */}
    </>
  );
};

export default AllModals;

const styles = StyleSheet.create({});
