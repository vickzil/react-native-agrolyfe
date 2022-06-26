import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = ({ color, onPress, tab, icon }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <Icon name={icon} size={28} style={[styles.Icon, { color: color }]} />}

      <Text style={[styles.text, { color: color }]}>{tab.name === "ProductNavigator" ? "Products" : tab.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Icon: {
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    marginTop: 5,
    paddingTop: 0,
    fontWeight: "500",
    textAlign: "center",
  },
});
export default Tab;
