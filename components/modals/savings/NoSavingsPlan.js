import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { setMySavingsModal, setSavingsModal } from "../../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../styles/colors";
import { globalStyles } from "../../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
const noImage = require("../../../assets/img/savings.png");

const NoSavingsPlan = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.oauth.theme);

  const showSavingsPlan = () => {
    dispatch(setSavingsModal(true));

    setTimeout(() => {
      dispatch(setMySavingsModal(false));
    }, 400);
  };

  return (
    <View style={[styles.productContainer, theme === "dark" && globalStyles.cardDark]}>
      <View style={{ alignItems: "center", marginTop: -50 }}>
        <View style={styles.productImage}>
          {theme !== "dark" ? (
            <Image
              source={noImage}
              style={{ width: 160, height: 160, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              resizeMode="cover"
            />
          ) : (
            <Icon
              name="wallet-outline"
              size={115}
              style={[{ paddingRight: 19, color: theme === "dark" ? "#fff" : colors.greenColor, marginLeft: 15 }]}
            />
          )}
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 40,
            fontFamily: "PoppinsBold",
            color: theme === "dark" ? "#fff" : "#222",
          }}
        >
          Your Rewarding Savings
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 20,
            textAlign: "center",
            fontFamily: "Poppins",
            paddingHorizontal: 20,
            color: theme === "dark" ? "#fff" : "#222",
          }}
        >
          Get started, choose the most suitable and convenient savings plan for you.
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.greenColor }]}
          onPress={() => showSavingsPlan()}
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
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",
  },
});
export default NoSavingsPlan;
