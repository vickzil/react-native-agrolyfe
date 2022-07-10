import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { addComma } from "../../../helpers/globalFunction";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const FSummary = ({ summaryDetails }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.productContainer, { marginBottom: 0 }]}>
        <View style={{ marginTop: 0, marginBottom: 10, width: "97%", paddingRight: 10 }}>
          <View style={styles.productCardContent}>
            <Text
              style={[
                styles.productCardContentItemRight,
                {
                  textAlign: "center",
                  fontSize: 24,
                  marginBottom: 35,
                  fontWeight: "600",
                  color: colors.greenDarkDarkColor,
                  fontFamily: "PoppinsBold",
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
              {summaryDetails?.additionalInformation}
            </Text>

            <View style={styles.productCard}>
              <View style={styles.productCardContent}>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Product</Text>
                  <Text style={styles.productCardContentItemRight}>{summaryDetails?.name}</Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Principal</Text>
                  <Text style={styles.productCardContentItemRight}>
                    ₦ {summaryDetails?.principal ? addComma(summaryDetails?.principal) : 0}
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Price Per Acre</Text>
                  <Text style={styles.productCardContentItemRight}>
                    ₦
                    {summaryDetails?.pricePerUnit
                      ? addComma(summaryDetails?.pricePerUnit) + " " + summaryDetails?.unitOfMeasurement
                      : 0}
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Duration</Text>
                  <Text style={styles.productCardContentItemRight}>{summaryDetails?.durationInMonths} months</Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Rental Fee (%)</Text>
                  <Text style={styles.productCardContentItemRight}>{summaryDetails?.interestRate}%</Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Post Charges</Text>
                  <Text style={styles.productCardContentItemRight}>
                    {summaryDetails?.interestRateAmountAfterCharges
                      ? addComma(summaryDetails?.interestRateAmountAfterCharges)
                      : 0}
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Mgt. Fee</Text>
                  <Text style={styles.productCardContentItemRight}>
                    {summaryDetails?.managementFeeAmount ? addComma(summaryDetails?.managementFeeAmount) : 0} (
                    {summaryDetails?.managementFeeRate + "%"})
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Frequency</Text>
                  <Text style={styles.productCardContentItemRight}>{summaryDetails?.frequency}</Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Currency</Text>
                  <Text style={styles.productCardContentItemRight}>{summaryDetails?.currency}</Text>
                </View>
                <View
                  style={[
                    styles.productCardContentItem,
                    { flexDirection: "column", borderBottomWidth: 0, paddingBottom: 60 },
                  ]}
                >
                  <Text style={[styles.productCardContentItemLeft, { fontWeight: "900" }]}>Total Payout</Text>
                  <Text
                    style={[
                      styles.productCardContentItemRight,
                      { fontWeight: "900", color: "#555", fontFamily: "MontserratBold", fontSize: 23 },
                    ]}
                  >
                    ₦{summaryDetails?.totalPayoutAmount ? addComma(summaryDetails?.totalPayoutAmount) : 0}
                  </Text>
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
    // height: screenHeight,
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
