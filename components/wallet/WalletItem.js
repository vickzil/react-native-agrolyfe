import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../styles/colors";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("screen");
// const imagedrop = require("../../assets/img/imagedrop.png");

const WalletItem = ({ item, index }) => {
  const loading = useSelector((state) => state.wallet.loading);

  return (
    <View style={[styles.card, index === 0 && styles.addMarginLeft]}>
      <Text style={styles.cardHeading}>{item.heading}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.paragraph, { color: colors.greenColor }]}>{item.paragraph}</Text>
        {loading ? <ActivityIndicator size="small" color="#14961E" /> : null}
      </View>
      {/* <TouchableOpacity style={{ marginTop: 30 }}>
        <View style={[styles.button, { color: colors.greenNormalColor, borderColor: colors.greenNormalColor }]}>
          <Text style={[styles.buttonText, { color: colors.greenNormalColor }]}>{item.buttonText}</Text>
          <Icon
            name="chevron-right-circle-outline"
            size={13}
            style={[styles.cardButtonIcon, { color: colors.greenNormalColor }]}
          />
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: width * 0.79,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: "#fff",
    borderWidth: 0.7,
    borderColor: "#18856f",
    borderStyle: "solid",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    textAlign: "left",
  },

  addMarginLeft: {
    marginLeft: 15,
  },

  cardHeading: {
    fontWeight: "500",
    fontSize: 17,
    textAlign: "center",
    letterSpacing: -0.35644,
    color: "rgba(24, 133, 111, 0.54)",
    marginBottom: 7,
    textAlign: "left",
    fontFamily: "Poppins",
  },

  paragraph: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 30,
    textAlign: "center",
    letterSpacing: -0.35644,
    marginBottom: 3,
    textAlign: "left",
  },

  button: {
    width: 150,
    backgroundColor: "#fff",
    borderWidth: 0.742584,
    borderStyle: "solid",
    borderRadius: 4.4555,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  buttonText: {
    fontSize: 14,
  },

  cardButtonIcon: {
    fontSize: 14,
  },

  imagedrop: {
    position: "absolute",
    right: 20,
    top: 2,
    zIndex: 30,
  },

  imagedropImage: {
    width: "100%",
    height: "100%",
  },
});
export default WalletItem;
