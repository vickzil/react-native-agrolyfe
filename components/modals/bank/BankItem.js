import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
const bankImage = require("../../../assets/img/access-bank.png");

const BankItem = () => {
  return (
    <View style={styles.bankGridItem}>
      <Text style={styles.bankGridItemHeaderText}>0719768893</Text>
      <Text style={styles.bankGridItemParaText}>Access Bank</Text>
      <View style={styles.bankImage}>
        <Image source={bankImage} style={[{ width: 100, height: 100, borderRadius: 100 }]} resizeMode="contain" />
      </View>
      <Text style={styles.bankGridItemBottomParaText}>VICTOR IKECHUKWU NWAKWUE</Text>
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
  },
});
export default BankItem;
