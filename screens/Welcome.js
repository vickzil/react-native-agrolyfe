import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Welcome = ({ navigation }) => {
  const hasLogin = useSelector((state) => state.oauth.hasLogin);
  const logo = require("../assets/img/banner.png");

  useEffect(() => {
    setTimeout(() => {
      // if (hasLogin) {
      //   navigation.navigate("Login");
      // } else {
      //   navigation.navigate("OnBoarding");
      // }

      navigation.navigate("Login");
    }, 3500);
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Image source={logo} style={styles.container}></Image>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
