import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../../styles/colors";

const EditProfileHeaderImageTop = () => {
  const user = require("../../../../assets/img/user.jpg");

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 110,
          height: 110,
          borderRadius: 100,
          padding: 4,
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        <Image
          source={user}
          style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
          resizeMode="cover"
        />

        <Ionicons name="camera" size={23} style={[styles.iconImageUpload, { color: "#fff" }]} />
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
    fontSize: 17,
    color: "#fff",
  },

  accountTitle: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#fff",
    fontWeight: "700",
  },

  iconImageUpload: {
    position: "absolute",
    bottom: 5,
    right: -5,
    backgroundColor: "#18856F",
    borderRadius: 50,
    padding: 8,
    fontWeight: "700",
  },
});
export default EditProfileHeaderImageTop;
