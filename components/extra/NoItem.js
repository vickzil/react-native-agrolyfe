import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import colors from "../../styles/colors";
const NoItem = ({ item: { type, buttonText, message } }) => {
  return (
    <View style={styles.noItem}>
      <View>
        {type === "BANK" && <Icon name="bank" size={60} style={[{ color: colors.greenNormalColor }]} />}
        {type === "CARD" && (
          <Icon name="credit-card-multiple-outline" size={60} style={[{ color: colors.greenNormalColor }]} />
        )}
        {type === "TRANSACTIONS" && (
          <Icon name="card-bulleted-outline" size={60} style={[{ color: colors.greenNormalColor }]} />
        )}
        {type === "REFERRALS" && <EntypoIcon name="users" size={60} style={[{ color: colors.greenNormalColor }]} />}
      </View>
      <View>
        <Text style={[styles.noItemText]}>{message}</Text>
      </View>

      {buttonText !== "" && (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.greenColor }]}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noItem: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  noItemText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 42,
    fontFamily: "Poppins",
  },

  button: {
    width: "90%",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 30,
  },

  buttonText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",
  },
});
export default NoItem;
