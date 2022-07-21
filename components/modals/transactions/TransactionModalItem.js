import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../../styles/colors";
import { formateDateAndTimeByName, removeUnderscoreFromString } from "../../helpers/globalFunction";
import SvgComponent2 from "../../customs/SvgComponent2";
import { useSelector } from "react-redux";
import { globalStyles } from "../../../styles/global";

const TransactionModalItem = ({ item }) => {
  const theme = useSelector((state) => state.oauth.theme);

  return (
    <ScrollView>
      <View style={[styles.productCard]}>
        <SvgComponent2 />
        <View style={styles.productCardContent}>
          <View style={styles.productCardContentItem}>
            <Text style={[styles.productCardContentItemLeft, theme === "dark" && globalStyles.textLightLight]}>
              Amount
            </Text>
            <Text
              style={[styles.productCardContentItemRight, item.drCr === "CR" ? styles.addedCash : styles.removeCash]}
            >
              {item.drCr === "CR" ? "+" : "-"} {item.currency} {item.amount}
            </Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={[styles.productCardContentItemLeft, theme === "dark" && globalStyles.textLightLight]}>
              Date
            </Text>
            <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
              {formateDateAndTimeByName(item.createdOn)}
            </Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={[styles.productCardContentItemLeft, theme === "dark" && globalStyles.textLightLight]}>
              Type
            </Text>
            <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
              {removeUnderscoreFromString(item.type)}
            </Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={[styles.productCardContentItemLeft, theme === "dark" && globalStyles.textLightLight]}>
              {" "}
              Status
            </Text>

            <Text
              style={[
                styles.productCardContentItemRight,
                styles.productCardContentItemRightStatus,
                item.status === "success" ? styles.statusSuccess : null,
              ]}
            >
              {item.status}
            </Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={[styles.productCardContentItemLeft, theme === "dark" && globalStyles.textLightLight]}>
              Description
            </Text>
            <View style={{ width: "70%", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <Text
                style={[
                  styles.productCardContentItemRight,
                  { textAlign: "right" },
                  theme === "dark" && globalStyles.textLight,
                ]}
              >
                {item.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: "100%",
    justifyContent: "center",
    // paddingHorizontal: 4,
    // paddingVertical: 15,

    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 10,
    // backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "#f0f0f0",
    marginTop: 50,
    marginBottom: 20,
    // elevation: 1,
  },

  productCardContent: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  productCardContentItem: {
    flexDirection: "row",
    paddingBottom: 25,
    marginBottom: 20,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },

  productCardContentItemLeft: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.greenLightDarkColor,
    marginRight: 15,
    fontFamily: "Poppins",
  },

  productCardContentItemRight: {
    fontSize: 16,
    color: "#444",
    fontWeight: "600",
    justifyContent: "flex-end",
    fontFamily: "Montserrat",
  },

  productCardContentItemRightStatus: {
    backgroundColor: "#b53e07",
    fontSize: 11,
    lineHeight: 20,
    color: "#fff",
    paddingVertical: 3,
    paddingHorizontal: 17,
    borderRadius: 20,
    fontFamily: "MontserratBold",
  },

  statusSuccess: {
    backgroundColor: colors.greenLightColor,
  },

  productCardContentTitle: {
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins",
  },

  productButton: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppins",
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
export default TransactionModalItem;
