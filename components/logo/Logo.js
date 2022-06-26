import { View, Text, Image } from "react-native";
import React from "react";

const Logo = () => {
  const logo = require("../../assets/img/logo.png");
  return (
    <View style={{ marginBottom: 20 }}>
      <Image source={logo} style={{ width: 130, height: 130 }} resizeMode="contain" />
    </View>
  );
};

export default Logo;
