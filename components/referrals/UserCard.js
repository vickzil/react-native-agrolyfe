import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { setReferralDetailsModal } from "../../store/alert/alertSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={{ padding: 5, width: "50%" }}
      onPress={() =>
        dispatch(
          setReferralDetailsModal({
            status: true,
            payload: item,
          }),
        )
      }
    >
      <View style={styles.userCard}>
        <View style={{ width: 80, height: 80, borderRadius: 100, padding: 4, backgroundColor: "#fff" }}>
          <Image
            source={{ uri: item.photo }}
            style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
            resizeMode="cover"
          />
        </View>
        <Text style={[styles.userCardText, { color: colors.greenColor }]}>
          {item ? item.firstName + " " + item.lastName : "-----"}
        </Text>
        <Text style={[styles.userCardText, { color: "#888", marginTop: 3, fontSize: 12 }]}>{item.code}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userCard: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
    // elevation: 1,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 5,
  },

  userCardText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Montserrat",
    marginTop: 10,
  },
});

export default UserCard;
