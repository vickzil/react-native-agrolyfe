import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { globalStyles } from "../../styles/global";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
const noImage = require("../../assets/img/investments.png");

const NoInvestments = () => {
  const navigation = useNavigation();
  const theme = useSelector((state) => state.oauth.theme);

  return (
    <View style={[styles.productContainer, theme === "dark" && globalStyles.containerDark]}>
      <View style={{ alignItems: "center", marginTop: -50 }}>
        <View style={styles.productImage}>
          <Image
            source={noImage}
            style={{ width: 200, height: 200, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            resizeMode="cover"
          />
        </View>
        <Text style={[{ fontSize: 20, fontWeight: "800", marginTop: 40 }, theme === "dark" && globalStyles.textLight]}>
          Your Rewarding Purchases
        </Text>
        <Text
          style={[{ fontSize: 18, marginTop: 20, textAlign: "center" }, theme === "dark" && globalStyles.textLight]}
        >
          Get started, choose the most suitable and convenient plan for you.
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.greenColor }]}
          onPress={() => navigation.navigate("Products")}
        >
          <Text style={styles.buttonText}>All Products</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  productImage: {
    marginTop: -50,
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
export default NoInvestments;
