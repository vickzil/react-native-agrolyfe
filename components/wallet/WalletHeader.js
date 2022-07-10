import React from "react";
import { StyleSheet, View } from "react-native";

import WalletOverview from "./WalletOverview";
import HeaderImageTop from "./HeaderImageTop";
const WalletHeader = ({ navigation }) => {
  return (
    <View style={styles.homeHeader}>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <HeaderImageTop />
        {/* <ReloadButton /> */}
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
