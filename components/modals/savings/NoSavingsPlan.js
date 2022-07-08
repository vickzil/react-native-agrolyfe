import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { setMySavingsModal, setSavingsModal } from "../../../store/alert/alertSlice";
import { useDispatch } from "react-redux";
import colors from "../../../styles/colors";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
const noImage = require("../../../assets/img/savings.png");

const NoSavingsPlan = () => {
  const dispatch = useDispatch();

  return (
    <View style={[styles.productContainer]}>
      <View style={{ alignItems: "center", marginTop: -50 }}>
        <View style={styles.productImage}>
          <Image
            source={noImage}
            style={{ width: 200, height: 200, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            resizeMode="cover"
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "800", marginTop: 40 }}>Your Rewarding Savings</Text>
        <Text style={{ fontSize: 18, marginTop: 20, textAlign: "center" }}>
          Get started, choose the most suitable and convenient savings plan for you.
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.greenColor }]}
          onPress={() => {
            dispatch(setSavingsModal(true));
            dispatch(setMySavingsModal(false));
          }}
        >
          <Text style={styles.buttonText}>Start saving</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  productImage: {
    // marginTop: -50,
  },

  button: {
    width: "90%",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 50,
  },

  buttonText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",
  },
});
export default NoSavingsPlan;
