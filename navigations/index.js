import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { saveUserInfo, setBearerToken, setHasLogin, setToken } from "../store/auth/authSlice";
import { getAuthentication } from "../store/auth/actions";
import axiosInstance from "../components/helpers/axiosInstance";
import axios from "axios";

export default function MainApp() {
  const dispatch = useDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = useSelector((state) => state.oauth.token);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const secretKey = useSelector((state) => state.oauth.secretKey);

  useEffect(() => {
    authUser();
  }, [token]);

  useLayoutEffect(() => {
    authLogin();
  }, []);

  useLayoutEffect(() => {
    getAppAuthentication();
  }, []);

  const getAppAuthentication = async () => {
    const response = await axiosInstance.post(`/v1.0/Authenticate/authenticateEndpoints`, {
      AppId: AppId,
      Secret: secretKey,
    });

    if (response && response?.data) {
      let appToken = response.data.value.token;
      AsyncStorage.setItem("bearerToken", appToken);
      axios.defaults.headers.common["Authorization"] = appToken;

      axiosInstance.interceptors.request.use(function (config) {
        config.headers.Authorization = appToken;

        return config;
      });

      dispatch(setBearerToken(appToken));
    }

    // console.log(response?.data);
  };

  const authUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      if (token) {
        dispatch(setToken(token));
        dispatch(saveUserInfo(JSON.parse(user) || null));
      } else {
        dispatch(setToken(""));
        dispatch(saveUserInfo(null));
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
