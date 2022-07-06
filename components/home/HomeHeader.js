import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutModal } from "../../store/alert/alertSlice";
const HomeHeader = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const userImage = require("../../assets/img/user-default.png");

  useEffect(() => {}, [user]);

  const handleLogout = () => {
    dispatch(setLogoutModal(true));
  };

  return (
    <View style={styles.homeHeader}>
      <View style={styles.homeHeaderLeft}>
        {user ? (
          <Image source={{ uri: user?.photo }} style={{ width: 46, height: 46, borderRadius: 50 }} resizeMode="cover" />
        ) : (
          <Image source={userImage} style={{ width: 46, height: 46, borderRadius: 50 }} resizeMode="cover" />
        )}

        <View style={styles.homeHeaderLeftdesc}>
          <Text style={styles.homeHeaderLeftdescText1}>Good Morning</Text>
          <Text style={styles.homeHeaderLeftdescText2}>{user && user.firstName}</Text>
        </View>
      </View>
      <View style={styles.homeHeaderRight}>
        <TouchableOpacity onPress={() => handleLogout()}>
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
