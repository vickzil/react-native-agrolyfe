import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const AccountImageFullName = () => {
  const user = require("../../assets/img/user.jpg");

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: 140, height: 140, borderRadius: 100, padding: 4, backgroundColor: "#fff" }}>
        <Image
          source={user}
          style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.accountUserFullName}>Victor Nwakwue</Text>
      <Text style={styles.accountLabel}>Username</Text>
      <Text style={styles.accountTitle}>@victor.nwakwue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerImageContainer: {
    backgroundColor: "#fff",
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
  },

  accountLabel: {
    fontFamily: "Poppins",
    fontSize: 14,
  },

  accountTitle: {
    fontFamily: "Poppins",
    fontSize: 14,
  },
});
export default AccountImageFullName;
