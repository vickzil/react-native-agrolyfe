import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const { width } = Dimensions.get("screen");
const HeaderBalance = () => {
  return (
    <View style={[styles.modalSearchContainer]}>
      <Text style={styles.modalHeaderTex}>₦ 0.00</Text>
      <Text style={[styles.modalHeaderTex, styles.modalHeaderText2]}>main balance</Text>
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
    paddingBottom: 30,
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
