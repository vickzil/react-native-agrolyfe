import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import Tab from "./Tab";

const { width } = Dimensions.get("screen");

const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState("Home");

  const { routes } = state;

  // let bottomRoutes = routes.filter(
  //   (route) =>
  //     route.name === "Home" || route.name === "ProductNavigator" || route.name === "Wallet" || route.name === "Account",
  // );

  const renderColor = (currentTab) => (currentTab === selected ? colors.greenLightColor : "#ccc");
  const handlePress = (activeTab, index) => {
    // console.log(route);
    setSelected(activeTab);
    if (state.index !== index) {
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes?.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 12,
    width,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.greenDarkColor,
    width: "95%",
    height: 65,
    paddingTop: 2,
    // borderTopWidth: 2,
    // borderTopColor: "#e0e0e0",
    // borderTopStyle: "solid",
    paddingHorizontal: 10,
    borderRadius: 100,
    elevation: 2,
  },
});

export default TabBar;
