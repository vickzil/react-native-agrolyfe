import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletOverview from "./WalletOverview";
import HeaderImageTop from "./HeaderImageTop";
const WalletHeader = ({ navigation }) => {
  const user = require("../../assets/img/user.jpg");

  const logout = () => {
    // AsyncStorage.setItem("user", JSON.stringify({ ...userDetails, loggedIn: false }));
    navigation.navigate("Login");
    // console.log(this.props);
  };

  return (
    <View style={styles.homeHeader}>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <HeaderImageTop />
      </View>
      <View>
        <WalletOverview />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeHeader: {
    fontFamily: "Poppins",
    width: "100%",
    // flexDirection: "row",

    backgroundColor: "#25453b",
    // paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 0,
  },

  homeHeaderLeft: {
    width: "60%",
    textAlign: "left",
    flexDirection: "row",
  },

  homeHeaderLeftdesc: {
    paddingLeft: 20,
  },

  homeHeaderLeftdescText1: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },

  homeHeaderLeftdescText2: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  homeHeaderRightIcon: {
    color: "#fff",
  },
});

export default WalletHeader;
