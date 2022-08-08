import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyProducts from "../components/products/MyProducts";
import AllProducts from "../components/products/AllProducts";
import colors from "../styles/colors";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SvgComponent from "../components/customs/SvgComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMenu } from "../store/auth/authSlice";
import { globalStyles } from "../styles/global";

const TopTab = createMaterialTopTabNavigator();
const ProductNavigator = () => {
  const dispatch = useDispatch();
  const selectedMenu = useSelector((state) => state.oauth.selectedMenu);
  const theme = useSelector((state) => state.oauth.theme);

  useEffect(() => {
    dispatch(setSelectedMenu("ProductNavigator"));
  }, [selectedMenu]);
  return (
    <SafeAreaProvider>
      <SvgComponent />
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkBody} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <TopTab.Navigator
        tabBarScrollEnabled={false}
        // tabBar={(props) => <TopBarTab {...props} />}
        screenOptions={{
          // tabBarLabel: (props) => <Text style={{ color: props.color }}></Text>,
          tabBarLabelStyle: theme === "dark" ? globalStyles.textLight : { color: colors.greenDarkColor },
          tabBarIndicatorStyle: theme === "dark" ? globalStyles.containerLight : { backgroundColor: colors.greenColor },
          tabBarStyle: { height: 55 },
          tabBarActiveTintColor: theme === "dark" ? "white" : "green",
          tabBarStyle: theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
        }}
        style={{ elevation: 2 }}
      >
        <TopTab.Screen
          name="Products"
          component={AllProducts}
          options={{
            tabBarLabel: "Farm Lands",
            tabBarActiveTintColor: theme === "dark" ? "white" : colors.greenColor,
            tabBarLabelStyle: { fontWeight: "800" },
            tabBarInactiveTintColor: theme === "dark" ? "#aaa" : "#222",
          }}
        />
        <TopTab.Screen
          name="Purchased"
          component={MyProducts}
          options={{
            tabBarLabel: "Purchased",
            tabBarActiveTintColor: theme === "dark" ? "white" : colors.greenColor,
            tabBarLabelStyle: { fontWeight: "800" },
            tabBarInactiveTintColor: theme === "dark" ? "#aaa" : "#222",
          }}
        />
      </TopTab.Navigator>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({});

export default ProductNavigator;
