import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { setHasLogin, setToken } from "../store/auth/authSlice";

export default function MainApp() {
  const dispatch = useDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = useSelector((state) => state.oauth.token);

  useLayoutEffect(() => {
    authUser();
  }, [token]);

  useLayoutEffect(() => {
    authLogin();
  }, []);

  const authUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(setToken(token));
      } else {
        dispatch(setToken(""));
      }
    } catch (error) {
      dispatch(setToken(""));
    }
  };

  const authLogin = async () => {
    try {
      const hasLogin = await AsyncStorage.getItem("hasLoggedIn");
      if (hasLogin) {
        dispatch(setHasLogin(true));
      } else {
        dispatch(setHasLogin(false));
      }
    } catch (error) {
      dispatch(setHasLogin(false));
    }
  };

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
      {/* <AppStack /> */}
    </NavigationContainer>
  );
}
