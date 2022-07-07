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

const Tab = createBottomTabNavigator();
const AppStack = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.oauth.user);

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
      dispatch(getAccountMangager(user?.code));
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
