import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../../styles/colors";

const SummaryItem = ({ item }) => {
  return (
    <ScrollView>
      <View style={styles.productCard}>
        <View style={styles.productCardContent}>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>From</Text>
            <Text style={styles.productCardContentItemRight}>N/A</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>To</Text>
            <Text style={styles.productCardContentItemRight}>Wallet</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Amount</Text>
            <Text style={styles.productCardContentItemRight}>₦3,971.25</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Date</Text>
            <Text style={styles.productCardContentItemRight}>15/05/2022, 8:23 pm</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Transaction Status</Text>
            <Text style={styles.productCardContentItemRight}>Failed</Text>
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
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "#f0f0f0",
    marginTop: 50,
    marginBottom: 20,
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
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});
export default SummaryItem;
