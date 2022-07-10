import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Wallet from "../screens/Wallet";
import Account from "../screens/Account";
import TabBar from "./TabBar";
import Referrals from "../screens/Referrals";
import ProductNavigator from "./ProductNavigator";
import AllModals from "../components/modals/AllModals";
import PageLoading from "../components/loader/PageLoading";
import { useDispatch, useSelector } from "react-redux";
import { getCountryInfo, getUserInfo } from "../store/auth/actions";
import { setGreetings, setPaystackRef } from "../store/auth/authSlice";
import { getAccountMangager } from "../store/accountManager/actions";
import { getUserWalletBalance, getWalletOptions } from "../store/wallet/actions";
import { getAllUserBankAccounts } from "../store/bank/actions";
import { getTransactionsInfo } from "../store/transactions/actions";
import { fetchAllInvestment, getMyInvestments } from "../store/products/actions";
import { getUserReferrals } from "../store/referrals/actions";
import { getSavingsMainCategories, getUserSavings } from "../store/savings/actions";
import { setAlertModal, setLoading, setToastModal } from "../store/alert/alertSlice";
import { getAirtimeDataProvidersPlans, getCableTVProviders, otherGlobalFunctions } from "../store/utilities/actions";
import axios from "axios";

const Tab = createBottomTabNavigator();
const AppStack = () => {
  const resendPinCompleted = useSelector((state) => state.oauth.resendPinCompleted);
  const paystackRef = useSelector((state) => state.oauth.paystackRef);

  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.oauth.user);

  useEffect(() => {
    if (paystackRef !== null) {
      insertUserCard(paystackRef);
    }
  }, [paystackRef]);

  useEffect(() => {
    if (resendPinCompleted === true) {
      dispatch(
        setToastModal({
          status: true,
          message: "Pin sent to your email",
        }),
      );
      setTimeout(() => {
        dispatch(setResendPinCompleted(false));
        dispatch(
          setToastModal({
            status: false,
            message: "",
          }),
        );
      }, 3500);
    }
  }, [resendPinCompleted]);

  useEffect(() => {
    getGreetings();
    globalFunctions();
  }, []);

  const globalFunctions = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    let user = JSON.parse(storedUser);
    setTimeout(() => {
      dispatch(getCountryInfo("NG"));
      dispatch(getUserInfo(user?.code));
      dispatch(fetchAllInvestment(user?.code));
      dispatch(getMyInvestments(user?.code));
      dispatch(getUserSavings(user?.code));
      dispatch(getSavingsMainCategories(user?.code));
      dispatch(getUserReferrals(user?.code));
      dispatch(getAccountMangager(user?.code));
      dispatch(getAllUserBankAccounts(user?.code));
      dispatch(getTransactionsInfo(user?.code));
      dispatch(getUserWalletBalance(user?.code));
      dispatch(getWalletOptions(user?.code));
      dispatch(getAirtimeDataProvidersPlans(user?.code));
      dispatch(getCableTVProviders(user?.code));
    }, 1200);
  };

  useEffect(() => {}, [loggedInUser]);

  const getGreetings = () => {
    let day = new Date();
    let hour = day.getHours();
    if (hour >= 0 && hour < 12) {
      dispatch(setGreetings("Good Morning!"));
    } else if (hour == 12) {
      dispatch(setGreetings("Good Day!"));
    } else if (hour >= 12 && hour <= 17) {
      dispatch(setGreetings("Good Afternoon!"));
    } else {
      dispatch(setGreetings("Good Evening!"));
    }
  };

  const insertUserCard = (paymentRef) => {
    dispatch(
      setLoading({
        status: true,
        message: "please wait...",
      }),
    );

    let payload = {
      AppId,
      RequestId,
      UserCode: user?.code,
      ProviderCardReference: paymentRef,
      Provider: "paystack",
      Amount: 100,
      Currency: "NGN",
    };

    axios
      .post(`${baseURL}/v1.0/UserCard/insertUserCard`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        console.log(response?.data);
        dispatch(setPaystackRef(null));

        if (response?.data?.success == true) {
          dispatch(getUserInfo(user?.code));
          dispatch(otherGlobalFunctions());

          setTimeout(() => {
            dispatch(
              setLoading({
                status: false,
                message: "",
              }),
            );

            dispatch(
              setAlertModal({
                status: true,
                type: "SUCCESS",
                title: "Card maintenance was successful",
                des: response.data.message,
                payload: null,
              }),
            );
          }, 2000);
        } else {
          dispatch(
            setLoading({
              status: false,
              message: "",
            }),
          );

          dispatch(
            setAlertModal({
              status: true,
              type: "error",
              title: "Login Error",
              des: response.data.message,
              payload: null,
            }),
          );
        }
      })
      .catch(() => {
        dispatch(setPaystackRef(null));
        dispatch(
          setLoading({
            status: false,
            message: "",
          }),
        );

        dispatch(
          setAlertModal({
            status: true,
            type: "error",
            title: "Service Error",
            des: "Service is temporarily unavailable. Please try again in a few minutes.",
            payload: null,
          }),
        );
      });
  };

  return (
    <>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} initialParams={{ icon: "home" }} />
        <Tab.Screen name="ProductNavigator" component={ProductNavigator} initialParams={{ icon: "leaf-maple" }} />
        <Tab.Screen name="Wallet" component={Wallet} initialParams={{ icon: "wallet-outline" }} />
        <Tab.Screen name="Account" component={Account} initialParams={{ icon: "shield-account" }} />
      </Tab.Navigator>
      <AllModals />
    </>
  );
};

export default AppStack;
