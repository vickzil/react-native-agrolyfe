import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../styles/colors";

const CustomButton = ({ title, valid, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      // disabled={valid}
      style={[
        {
          height: 60,
          width: "100%",
          backgroundColor: "#14961E",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 500,
        },
      ]}
    >
      {/* !valid && { backgroundColor: colors.greenLightDarkColor }, */}
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 17 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
