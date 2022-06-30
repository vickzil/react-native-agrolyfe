import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/auth/authSlice";
import { setLoading } from "../../store/alert/alertSlice";
const HomeHeader = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = require("../../assets/img/user.jpg");

  const logout = () => {
    // AsyncStorage.setItem("user", JSON.stringify({ ...userDetails, loggedIn: false }));

    dispatch(
      setLoading({
        status: true,
        message: "please wait...",
      }),
    );

    setTimeout(() => {
      AsyncStorage.removeItem("token");
      dispatch(
        setLoading({
          status: false,
          message: "",
        }),
      );

      dispatch(setToken(""));

      // setTimeout(() => {
      //   navigation.navigate("Login");
      // }, 300);
    }, 1000);

    // console.log(this.props);
  };

  return (
    <View style={styles.homeHeader}>
      <View style={styles.homeHeaderLeft}>
        <Image source={user} style={{ width: 46, height: 46, borderRadius: 50 }} resizeMode="cover" />
        <View style={styles.homeHeaderLeftdesc}>
          <Text style={styles.homeHeaderLeftdescText1}>Good Morning</Text>
          <Text style={styles.homeHeaderLeftdescText2}>Victor</Text>
        </View>
      </View>
      <View style={styles.homeHeaderRight}>
        <TouchableOpacity onPress={() => logout()}>
          <Icon name="power-standby" size={25} style={styles.homeHeaderRightIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  homeHeader: {
    fontFamily: "Poppins",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#25453b",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 160,
  },

  homeHeaderLeft: {
    width: "60%",
    textAlign: "left",
    flexDirection: "row",
  },

  homeHeaderLeftdesc: {
    paddingLeft: 20,
  },

  homeHeaderLeftdescText1: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },

  homeHeaderLeftdescText2: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  homeHeaderRightIcon: {
    color: "#fff",
  },
});
