import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import OnBoarding from "../screens/OnBoarding";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgotPassword from "../screens/ForgotPassword";
import InputCode from "../screens/InputCode";
import CompleteRegister from "../screens/CompleteRegister";
import { useDispatch, useSelector } from "react-redux";
import TwoFactor from "../screens/TwoFactor";
import AlertModal from "../components/modals/AlertModal";
import { removeStorageItemValue } from "../components/helpers/globalFunction";
import { setUserWalletBalance } from "../store/wallet/walletSlice";
import { getTransactionsInfo } from "../store/transactions/actions";
import {
  SaveLoginIdentity,
  saveUserInfo,
  setAdverts,
  setDashboardMessage,
  setToken,
  setVerificationInfo,
} from "../store/auth/authSlice";
import { useNavigation } from "@react-navigation/native";
import { logoutAllAccount } from "../store/auth/actions";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const hasLogin = useSelector((state) => state.oauth.hasLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    logoutUserDueToInactivity();
  }, []);

  const logoutUserDueToInactivity = () => {
    removeStorageItemValue("token");
    removeStorageItemValue("appexrat");
    removeStorageItemValue("user");
    dispatch(setToken(""));
    dispatch(saveUserInfo(null));
    dispatch(logoutAllAccount());
    dispatch(setUserWalletBalance(null));
    dispatch(setVerificationInfo(null));
    dispatch(setDashboardMessage(null));
    dispatch(setAdverts(null));
  };

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={hasLogin ? "Login" : "Welcome"}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="InputCode" component={InputCode} />
        <Stack.Screen name="TwoFactor" component={TwoFactor} />
        <Stack.Screen name="CompleteRegister" component={CompleteRegister} />
      </Stack.Navigator>

      <AlertModal />
    </>
  );
};

export default AuthStack;
