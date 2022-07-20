import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransactionDetailsModal } from "../../store/alert/alertSlice";
import { formateDateAndTimeByName } from "../helpers/globalFunction";
import colors from "../../styles/colors";
import { globalStyles } from "../../styles/global";

const TransactionItem = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.oauth.theme);

  return (
    <TouchableOpacity
      style={{ width: "100%" }}
      onPress={() =>
        dispatch(
          setTransactionDetailsModal({
            status: true,
            payload: item,
          }),
        )
      }
    >
      <View style={[styles.transactionItem, theme === "dark" && globalStyles.cardDark]}>
        <View style={styles.transactionItemLeft}>
          <Text
            style={[
              styles.transactionItemLeftP,
              styles.transactionItemLeftP1,
              theme === "dark" && globalStyles.textLight,
            ]}
          >
            {formateDateAndTimeByName(item.createdOn)}
          </Text>
          <Text
            style={[styles.transactionItemLeftP, { fontFamily: "Poppins" }, theme === "dark" && globalStyles.textLight]}
          >
            {item.description}
            {/* {removeUnderscoreFromString(item.type)} */}
          </Text>
        </View>
        <View style={styles.transactionItemRight}>
          <Text
            style={[
              styles.transactionItemLeftP,
              styles.transactionItemLeftP3,
              item.drCr === "CR" ? styles.addedCash : styles.removeCash,
              theme === "dark" && globalStyles.textLight,
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

export default TransactionItem;

const styles = StyleSheet.create({
  transactionItem: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },

  transactionItemLeft: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "75%",
    marginRight: 10,
  },

  transactionItemLeftP: {
    marginBottom: 10,
    fontWeight: "600",
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
