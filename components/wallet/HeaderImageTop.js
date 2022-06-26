import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const HeaderImageTop = () => {
  const user = require("../../assets/img/user.jpg");

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: 80, height: 80, borderRadius: 100, padding: 4, backgroundColor: "#fff" }}>
        <Image
          source={user}
          style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.accountUserFullName}>Victor Nwakwue</Text>
      <Text style={styles.accountTitle}>OIG-00424</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerImageContainer: {
    paddingBottom: 40,
  },

  accountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  accountUserFullName: {
    fontFamily: "Poppins",
    marginTop: 14,
    fontSize: 18,
    color: "#fff",
  },

  accountLabel: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#fff",
  },

  accountTitle: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#fff",
  },
});
export default HeaderImageTop;
