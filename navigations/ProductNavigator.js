import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/products/Products";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyProducts from "../components/products/MyProducts";
import AllProducts from "../components/products/AllProducts";
import TopBarTab from "./TopBarTab";
import colors from "../styles/colors";
import GeneralStatusBarColor from "../components/customs/statusbar/GeneralStatusBarColor";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SvgComponent from "../components/customs/SvgComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMenu } from "../store/auth/authSlice";

// const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const ProductNavigator = () => {
  const dispatch = useDispatch();
  const selectedMenu = useSelector((state) => state.oauth.selectedMenu);

  useEffect(() => {
    dispatch(setSelectedMenu("ProductNavigator"));
  }, [selectedMenu]);
  return (
    <SafeAreaProvider>
      <SvgComponent />
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TopTab.Navigator
        tabBarScrollEnabled={false}
        // tabBar={(props) => <TopBarTab {...props} />}
        screenOptions={{
          // tabBarLabel: (props) => <Text style={{ color: props.color }}></Text>,
          tabBarLabelStyle: { color: colors.greenDarkColor },
          tabBarIndicatorStyle: { backgroundColor: colors.greenColor },
          tabBarStyle: { height: 55 },
          tabBarActiveTintColor: "green",
        }}
        style={{ elevation: 2 }}
      >
        <TopTab.Screen
          name="Products"
          component={AllProducts}
          options={{
            tabBarLabel: "Farm Lands",
            tabBarActiveTintColor: colors.greenColor,
            tabBarLabelStyle: { fontWeight: "800" },
            tabBarInactiveTintColor: "#222",
          }}
        />
        <TopTab.Screen
          name="Purchased"
          component={MyProducts}
          options={{
            tabBarLabel: "Purchased",
            tabBarActiveTintColor: colors.greenColor,
            tabBarLabelStyle: { fontWeight: "800" },
            tabBarInactiveTintColor: "#222",
          }}
        />
      </TopTab.Navigator>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({});

export default ProductNavigator;
