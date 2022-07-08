import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ReferralHeaderImageTop = ({ item }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: 60, height: 60, borderRadius: 100, padding: 4, backgroundColor: "#fff" }}>
        <Image
          source={{ uri: item.photo }}
          style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.accountUserFullName}>{item ? item.firstName + " " + item.lastName : "-----"}</Text>
      <Text style={styles.accountTitle}>{item.code}</Text>
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
    fontSize: 17,
    color: "#fff",
  },

  accountTitle: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#fff",
    fontWeight: "700",
  },
});
export default ReferralHeaderImageTop;
