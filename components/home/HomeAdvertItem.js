import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const HomeAdvertItem = ({ item, index }) => {
  return (
    <View style={[styles.card, index === 0 && styles.addMarginLeft]}>
      <View style={styles.productImage}>
        <Image source={item.img} style={{ width: "100%", height: 250, borderRadius: 10 }} resizeMode="cover" />
      </View>
    </View>
  );
};

export default HomeAdvertItem;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: width * 0.69,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: "#fff",
    borderWidth: 0.7,
    borderColor: "#dee2e6",
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: "left",
  },

  addMarginLeft: {
    marginLeft: 0,
  },

  cardHeading: {
    fontWeight: "500",
    fontSize: 13,
    textAlign: "center",
    letterSpacing: -0.35644,
    color: "rgba(24, 133, 111, 0.94)",
    marginBottom: 0,
    textAlign: "left",
    fontFamily: "PoppinsBold",
  },

  paragraph: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 30,
    textAlign: "left",
    letterSpacing: -0.35644,
    marginBottom: 6,
    textAlign: "left",
  },

  button: {
    width: 150,
    backgroundColor: "#fff",
    // borderWidth: 0.742584,
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
