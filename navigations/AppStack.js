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
import { setGreetings } from "../store/auth/authSlice";
import { getAccountMangager } from "../store/accountManager/actions";
import { getUserWalletBalance, getWalletOptions } from "../store/wallet/actions";
import { getAllUserBankAccounts } from "../store/bank/actions";
import { getTransactionsInfo } from "../store/transactions/actions";
import { fetchAllInvestment, getMyInvestments } from "../store/products/actions";
import { getUserReferrals } from "../store/referrals/actions";
import { getSavingsMainCategories, getUserSavings } from "../store/savings/actions";
import { setToastModal } from "../store/alert/alertSlice";
import { getAirtimeDataProvidersPlans, getCableTVProviders } from "../store/utilities/actions";

const Tab = createBottomTabNavigator();
const AppStack = () => {
  const resendPinCompleted = useSelector((state) => state.oauth.resendPinCompleted);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.oauth.user);

  useEffect(() => {
    if (resendPinCompleted) {
      dispatch(
        setToastModal({
          status: true,
          message: "Pin sent to your email",
        }),
      );
      setTimeout(() => {
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
    }, 2200);
  };

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
