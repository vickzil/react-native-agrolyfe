import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { setTransactionDetailsModal } from "../../store/alert/alertSlice";
import colors from "../../styles/colors";
import { formateDateAndTimeByName } from "../helpers/globalFunction";

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
            payload: item,
          }),
        )
      }
    >
      <View style={styles.transactionItem}>
        <View style={styles.transactionItemLeft}>
          <Text style={[styles.transactionItemLeftP, styles.transactionItemLeftP1]}>
            {formateDateAndTimeByName(item.createdOn)}
          </Text>
          <Text style={[styles.transactionItemLeftP]}>{item.description}</Text>
        </View>
        <View style={styles.transactionItemRight}>
          <Text
            style={[
              styles.transactionItemLeftP,
              styles.transactionItemLeftP3,
              item.drCr === "CR" ? styles.addedCash : styles.removeCash,
            ]}
          >
            {item.drCr === "CR" ? "+" : "-"} {item.currency} {item.amount}
          </Text>
          <Text
            style={[
              styles.transactionItemLeftP,
              styles.productCardContentItemRightStatus,
              item.status === "success" ? styles.statusSuccess : null,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AllTransactionItem;

const styles = StyleSheet.create({
  transactionMainItem: {
    // elevation: 3,
    // backgroundColor: "#fff",
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
    elevation: 0.6,
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

  productCardContentItemRightStatus: {
    fontSize: 13,
    textAlign: "center",
    borderRadius: 20,
    fontFamily: "MontserratBold",
  },

  statusSuccess: {
    color: colors.greenLightColor,
  },

  addedCash: {
    color: colors.greenColor,
    fontWeight: "600",
  },

  removeCash: {
    color: "red",
    fontWeight: "600",
  },
});
