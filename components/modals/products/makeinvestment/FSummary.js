import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const FSummary = ({ summaryDetails }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.productContainer, { marginBottom: 250 }]}>
        <View style={{ marginTop: 20, marginBottom: 10, width: "97%", paddingRight: 10 }}>
          <View style={styles.productCardContent}>
            <Text
              style={[
                styles.productCardContentItemRight,
                {
                  textAlign: "center",
                  fontSize: 29,
                  marginBottom: 35,
                  fontWeight: "700",
                  color: colors.greenDarkDarkColor,
                  fontFamily: "Poppins",
                  letterSpacing: -0.35644,
                },
              ]}
            >
              Summary
            </Text>

            <Text
              style={[
                {
                  fontWeight: "700",
                  textAlign: "center",
                  marginBottom: 7,
                  fontSize: 18,
                  fontFamily: "Poppins",
                },
              ]}
            >
              Note:
            </Text>
            <Text
              style={[
                {
                  textAlign: "center",
                  fontSize: 16,
                  marginBottom: 30,
                  fontWeight: "600",
                  color: "#555",
                  fontFamily: "Poppins",
                },
              ]}
            >
              After purchase of the farm land, a farmer will be assigned to your purchased land for farming activities
              within a month. On a quarterly basis, a farm rental fee of NGN 44500.00 will be credited to your wallet.
              This means a total of NGN 160200.00 will be credited to your after the 20.00 farming cycle. A total of NGN
              1050200.00 would have been paid to you after the farming cycle.
            </Text>

            <View style={styles.productCard}>
              <View style={styles.productCardContent}>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Name</Text>
                  <Text style={styles.productCardContentItemRight}>my savings</Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Periodic Amount</Text>
                  <Text style={styles.productCardContentItemRight}>₦ 890,000</Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Frequency</Text>
                  <Text style={styles.productCardContentItemRight}>Once a month</Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Duration</Text>
                  <Text style={styles.productCardContentItemRight}>12 months</Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Interest</Text>
                  <Text style={styles.productCardContentItemRight}>12%</Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>End Date</Text>
                  <Text style={styles.productCardContentItemRight}>22/06/2023</Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Payments Methods</Text>
                  <Text style={styles.productCardContentItemRight}>Card</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    alignItems: "center",
  },

  productCard: {
    width: "100%",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 20,
  },

  productCardContent: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 0,
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
    fontSize: 16.5,
    fontWeight: "600",
    color: colors.greenLightDarkColor,
    marginRight: 15,
    fontFamily: "Poppins",
  },

  productCardContentItemRight: {
    fontSize: 17,
    color: "#444",
    fontWeight: "600",
    justifyContent: "flex-end",
    fontFamily: "Montserrat",
  },
});

export default FSummary;
