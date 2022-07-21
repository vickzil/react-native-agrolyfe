import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../../styles/global";
import { useSelector } from "react-redux";

const BankItem = ({ item }) => {
  let bankImage = require("../../../assets/img/bank.png");
  const theme = useSelector((state) => state.oauth.theme);
  // bankList.find((imageBank) => imageBank.code == item.bankCode)?.flag || require("../../../assets/img/bank.png");

  return (
    <View style={[styles.bankGridItem, theme === "dark" && globalStyles.cardDark]}>
      <Text style={[styles.bankGridItemHeaderText, theme === "dark" && globalStyles.textLight]}>
        {item?.accountNumber}
      </Text>
      <Text style={[styles.bankGridItemParaText, theme === "dark" && globalStyles.textLight]}>{item?.bankName}</Text>
      <View style={styles.bankImage}>
        <Image source={bankImage} style={[{ width: "30%", height: 58, borderRadius: 100 }]} resizeMode="contain" />
      </View>
      <Text style={[styles.bankGridItemBottomParaText, theme === "dark" && globalStyles.textLight]}>
        {item?.accountName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bankGridItem: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 38,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    elevation: 1,
    borderRadius: 17,
    marginTop: 10,
    marginBottom: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },

  bankGridItemHeaderText: {
    textAlign: "left",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Poppins",
  },

  bankGridItemParaText: {
    textAlign: "left",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
    fontFamily: "Poppins",
    textTransform: "uppercase",
    // letterSpacing: 2,
  },

  bankImage: {
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    marginTop: -80,
  },

  bankGridItemBottomParaText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 40,
  },
});
export default BankItem;
