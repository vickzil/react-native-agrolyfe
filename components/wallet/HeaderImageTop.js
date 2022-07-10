import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const HeaderImageTop = () => {
  const user = useSelector((state) => state.oauth.user);
  const userImage = require("../../assets/img/user-default.png");

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: 80, height: 80, borderRadius: 100, padding: 4, backgroundColor: "#fff" }}>
        {user ? (
          <Image
            source={{ uri: user?.photo }}
            style={{ width: "100%", height: "100%", borderRadius: 50 }}
            resizeMode="cover"
          />
        ) : (
          <Image source={userImage} style={{ width: "100%", height: "100%", borderRadius: 50 }} resizeMode="cover" />
        )}
      </View>
      <Text style={styles.accountUserFullName}>{user ? user.firstName + " " + user.lastName : "-----"}</Text>
      <Text style={styles.accountTitle}>{user ? user.code : "-----"}</Text>
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
