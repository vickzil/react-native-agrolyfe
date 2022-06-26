import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const Welcome = ({ navigation }) => {
  const logo = require("../assets/img/banner.jpg");

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Products");
    }, 3000);
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
