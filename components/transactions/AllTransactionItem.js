import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { setTransactionDetailsModal } from "../../store/alert/alertSlice";

const AllTransactionItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.transactionMainItem, { width: "100%" }]}
      onPress={() =>
        dispatch(
          setTransactionDetailsModal({
            status: true,
            payload: null,
          }),
        )
      }
    >
      <View style={styles.transactionItem}>
        <View style={styles.transactionItemLeft}>
          <Text style={[styles.transactionItemLeftP, styles.transactionItemLeftP1]}>23 Mar 2022</Text>
          <Text style={[styles.transactionItemLeftP]}>
            Saving's wallet No. 1 funding for savings with code SAVSHPY8X83SZVU
          </Text>
        </View>
        <View style={styles.transactionItemRight}>
          <Text style={[styles.transactionItemLeftP, styles.transactionItemLeftP3]}>+ NGN 100</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AllTransactionItem;

const styles = StyleSheet.create({
  transactionMainItem: {
    // elevation: 3,
    backgroundColor: "#fff",
  },
  transactionItem: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 1,
  },

  transactionItemLeft: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "75%",
    marginRight: 10,
  },

  transactionItemLeftP: {
    marginBottom: 10,
    fontWeight: "400",
    fontSize: 13,
    textAlign: "left",
    letterSpacing: -0.35644,
    fontFamily: "Poppins",
  },

  transactionItemLeftP2: {
    fontSize: 14,
  },

  transactionItemLeftP3: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "right",
  },
});
