import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgotPassword from "../screens/ForgotPassword";
import InputCode from "../screens/InputCode";
import CompleteRegister from "../screens/CompleteRegister";
import PageLoading from "../components/loader/PageLoading";
import { useSelector } from "react-redux";
import TwoFactor from "../screens/TwoFactor";
import AlertModal from "../components/modals/AlertModal";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const [initialRouteName, setInitialRouteName] = useState();
  const hasLogin = useSelector((state) => state.oauth.hasLogin);

  // useEffect(() => {
  //   authLogin();
  // }, []);

  // const authLogin = async () => {
  //   try {
  //     const hasLogin = await AsyncStorage.getItem("hasLoggedIn");
  //     if (hasLogin) {
  //       setInitialRouteName("Login");
  //     } else {
  //       setInitialRouteName("Welcome");
  //     }
  //   } catch (error) {
  //     setInitialRouteName("Welcome");
  //   }
  // };

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={hasLogin ? "Login" : "Welcome"}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="InputCode" component={InputCode} />
        <Stack.Screen name="TwoFactor" component={TwoFactor} />
        <Stack.Screen name="CompleteRegister" component={CompleteRegister} />
      </Stack.Navigator>

      <PageLoading />
      <AlertModal />
    </>
  );
};

export default AuthStack;
