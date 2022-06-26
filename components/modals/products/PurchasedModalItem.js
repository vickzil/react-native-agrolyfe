import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../../styles/colors";

const PurchasedModalItem = ({ item }) => {
  return (
    <ScrollView>
      <View style={styles.productCard}>
        <View style={styles.productCardContent}>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Duration</Text>
            <Text style={styles.productCardContentItemRight}>12 Months</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Rental Fee (%)</Text>
            <Text style={styles.productCardContentItemRight}>20%</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Amount</Text>
            <Text style={styles.productCardContentItemRight}>₦3,971.25</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Date Purchased</Text>
            <Text style={styles.productCardContentItemRight}>15/05/2022, 8:23 pm</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}> Status</Text>

            <Text style={[styles.productCardContentItemRight, styles.productCardContentItemRightStatus]}>Ongoing</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Maturity Date</Text>
            <Text style={styles.productCardContentItemRight}>15/05/2022, 8:23 pm</Text>
          </View>
          <View style={[styles.productCardContentItem, { flexDirection: "column" }]}>
            <Text style={[styles.productCardContentItemLeft, { fontWeight: "900" }]}>Total Payout</Text>
            <Text
              style={[
                styles.productCardContentItemRight,
                { fontWeight: "900", color: "#555", fontFamily: "MontserratBold", fontSize: 23 },
              ]}
            >
              ₦38,971.25
            </Text>
          </View>

          <TouchableOpacity style={{ marginTop: 30, marginBottom: 40 }}>
            <View style={[styles.productButton, { backgroundColor: colors.greenColor, marginTop: 10 }]}>
              <Text style={styles.buttonText}>Cashout</Text>
            </View>
          </TouchableOpacity>
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

  productCardContentItemRightStatus: {
    backgroundColor: colors.greenLightColor,
    fontSize: 11,
    lineHeight: 20,
    color: "#fff",
    paddingVertical: 3,
    paddingHorizontal: 17,
    borderRadius: 20,
    fontFamily: "MontserratBold",
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
});
export default PurchasedModalItem;
