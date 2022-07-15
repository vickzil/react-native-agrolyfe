import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { addComma } from "../helpers/globalFunction";

const { width } = Dimensions.get("screen");
const HeaderBalance = () => {
  const showBalances = useSelector((state) => state.oauth.showBalances);
  const userWalletBalance = useSelector((state) => state.wallet.userWalletBalance);
  const walletLoading = useSelector((state) => state.wallet.loading);

  return (
    <View style={[styles.modalSearchContainer]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.modalHeaderTex, walletLoading && { marginRight: 10 }]}>
          {" "}
          {userWalletBalance
            ? showBalances
              ? "NGN " + addComma(userWalletBalance?.availableBalance) + ".00"
              : "******"
            : "NGN 0.00"}
        </Text>
        {walletLoading ? <ActivityIndicator size="small" color="#14961E" /> : null}
      </View>
      <Text style={[styles.modalHeaderTex, styles.modalHeaderText2, { fontFamily: "Montserrat", fontWeight: "600" }]}>
        Main balance
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingVertical: 0,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 20,
  },

  modalHeaderTex: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 27,
    // lineHeight: 29,
    // marginTop: 10,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
    color: "#fff",
  },

  modalHeaderText2: {
    fontSize: 16,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});
export default HeaderBalance;
