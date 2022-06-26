import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: "#14961E",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 500,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 17 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
