import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { globalStyles } from "../../styles/global";

const AccountImageFullName = () => {
  const user = useSelector((state) => state.oauth.user);
  const darkMode = useSelector((state) => state.oauth.darkMode);
  const theme = useSelector((state) => state.oauth.theme);
  const userImage = require("../../assets/img/user-default.png");

  useEffect(() => {}, [user]);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: 140, height: 140, borderRadius: 100, padding: 4, backgroundColor: "#fff" }}>
        {user ? (
          <Image
            source={{ uri: user?.photo }}
            style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={userImage}
            style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
            resizeMode="cover"
          />
        )}
      </View>
      <Text style={[styles.accountUserFullName, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}>
        {user ? user.firstName + " " + user.lastName : "-----"}
      </Text>
      <Text style={[styles.accountLabel, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}>
        Username
      </Text>
      <Text style={[styles.accountTitle, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}>
        @{user ? user.userName : "-----"}
      </Text>
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
