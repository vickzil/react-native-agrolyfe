import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { bankList } from "../../../constant/bankList";
// const bankImage = require("../../../assets/img/bank.png");

const BankItem = ({ item }) => {
  let bankImage =
    bankList.find((imageBank) => imageBank.code == item.bankCode)?.flag || require("../../../assets/img/bank.png");

  return (
    <View style={styles.bankGridItem}>
      <Text style={styles.bankGridItemHeaderText}>{item?.accountNumber}</Text>
      <Text style={styles.bankGridItemParaText}>{item?.bankName}</Text>
      <View style={styles.bankImage}>
        <Image source={bankImage} style={[{ width: "40%", height: 80, borderRadius: 100 }]} resizeMode="contain" />
      </View>
      <Text style={styles.bankGridItemBottomParaText}>{item?.accountName}</Text>
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
