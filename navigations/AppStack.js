import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Wallet from "../screens/Wallet";
import Account from "../screens/Account";
import TabBar from "./TabBar";
import Referrals from "../screens/Referrals";
import ProductNavigator from "./ProductNavigator";
import AllModals from "../components/modals/AllModals";
import PageLoading from "../components/loader/PageLoading";

const Tab = createBottomTabNavigator();
const AppStack = () => {
  return (
    <>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} initialParams={{ icon: "home" }} />
        <Tab.Screen name="ProductNavigator" component={ProductNavigator} initialParams={{ icon: "leaf-maple" }} />
        <Tab.Screen name="Wallet" component={Wallet} initialParams={{ icon: "wallet-outline" }} />
        <Tab.Screen name="Account" component={Account} initialParams={{ icon: "shield-account" }} />
        <Tab.Screen name="Referrals" component={Referrals} />
      </Tab.Navigator>
      <AllModals />
      <PageLoading />
    </>
  );
};

export default AppStack;
