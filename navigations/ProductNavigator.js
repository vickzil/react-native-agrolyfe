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

// const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const ProductNavigator = () => {
  return (
    <SafeAreaProvider>
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
        <TopTab.Screen name="Products" component={AllProducts} />
        <TopTab.Screen name="Purchased" component={MyProducts} />
      </TopTab.Navigator>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({});

export default ProductNavigator;
