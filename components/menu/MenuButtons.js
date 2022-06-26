import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MenuButtons = ({ navigation }) => {
  return (
    <View style={styles.mobileMenu}>
      <TouchableOpacity style={styles.mobileMenuLinks} onPress={() => navigation.navigate("Home")}>
        <Icon name="home" size={22} style={styles.mobileMenuIcon} />
        <Text style={styles.mobileMenuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mobileMenuLinks} onPress={() => navigation.navigate("Products")}>
        <Icon name="leaf-maple" size={22} style={styles.mobileMenuIcon} />
        <Text style={styles.mobileMenuText}>Products</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mobileMenuLinks}>
        <Icon name="wallet-outline" size={22} style={styles.mobileMenuIcon} />
        <Text style={styles.mobileMenuText}>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mobileMenuLinks}>
        <Icon name="shield-account" size={22} style={styles.mobileMenuIcon} />
        <Text style={styles.mobileMenuText}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuButtons;

const styles = StyleSheet.create({
  mobileMenu: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 65,
    zIndex: 9000,
    paddingTop: 2,
    // paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
  },

  mobileMenuLinks: {
    width: "25%",
  },

  mobileMenuIcon: {
    color: "#757575",
    textAlign: "center",
  },

  mobileMenuText: {
    fontSize: 15,
    marginTop: 5,
    paddingTop: 0,
    fontWeight: "500",
    textAlign: "center",
  },
});
