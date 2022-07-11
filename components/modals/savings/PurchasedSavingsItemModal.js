import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../../styles/colors";
import { addComma, formateDateByName } from "../../helpers/globalFunction";
import { useDispatch } from "react-redux";
import { setTopUpSavingsModal } from "../../../store/alert/alertSlice";

const PurchasedSavingsItemModal = ({ currentSavings }) => {
  const dispatch = useDispatch();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.productCard}>
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
                textAlign: "center",
                fontSize: 16,
                marginBottom: 30,
                fontWeight: "600",
                color: "#555",
                fontFamily: "Poppins",
              },
            ]}
          >
            {currentSavings?.paymentSummary}
          </Text>
        </View>
        <View style={styles.productCardContent}>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Plan Type</Text>
            <Text style={styles.productCardContentItemRight}>{currentSavings.savingsMainCategoryCode} Plan</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Code</Text>
            <Text style={styles.productCardContentItemRight}>{currentSavings.code}</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Periodic Amount</Text>
            <Text style={styles.productCardContentItemRight}>
              ₦ {currentSavings ? addComma(currentSavings?.paymentAmountPerFrequency) : 0}
            </Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Duration</Text>
            <Text style={styles.productCardContentItemRight}>{currentSavings.duration} Months</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Frequency</Text>
            <Text style={styles.productCardContentItemRight}>{currentSavings.frequency}</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Next Due Date</Text>
            <Text style={styles.productCardContentItemRight}>{formateDateByName(currentSavings.nextDueDate)}</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}> Status</Text>

            <Text
              style={[
                styles.productCardContentItemRight,
                styles.productCardContentItemRightStatus,
                currentSavings.status === "running" ? styles.statusSuccess : null,
                currentSavings.status === "new" ? styles.statusNew : null,
              ]}
            >
              {currentSavings.status}
            </Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Number of Payments</Text>
            <Text style={styles.productCardContentItemRight}>{currentSavings?.totalNumberOfPayments}</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Current Installment</Text>
            <Text style={styles.productCardContentItemRight}>
              ₦ {currentSavings ? addComma(currentSavings?.currentInstallment) : 0}
            </Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Vat Rate</Text>
            <Text style={styles.productCardContentItemRight}>{currentSavings?.vatRate}%</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>First Payment On</Text>
            <Text style={styles.productCardContentItemRight}>{formateDateByName(currentSavings.firstPaymentOn)}</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Last Debit On</Text>
            <Text style={styles.productCardContentItemRight}>{formateDateByName(currentSavings.lastDebitOn)}</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Start Date</Text>
            <Text style={styles.productCardContentItemRight}>{formateDateByName(currentSavings.startDate)}</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>End Date</Text>
            <Text style={styles.productCardContentItemRight}>{formateDateByName(currentSavings.endDate)}</Text>
          </View>
          <View style={styles.productCardContentItem}>
            <Text style={styles.productCardContentItemLeft}>Payment Method</Text>
            <Text style={styles.productCardContentItemRight}>{currentSavings.paymentMethod}</Text>
          </View>
          <View style={[styles.productCardContentItem, { flexDirection: "column" }]}>
            <Text style={[styles.productCardContentItemLeft, { fontWeight: "900" }]}>Total Payout</Text>
            <Text
              style={[
                styles.productCardContentItemRight,
                { fontWeight: "900", color: "#555", fontFamily: "MontserratBold", fontSize: 23 },
              ]}
            >
              ₦ {currentSavings ? addComma(currentSavings?.totalPayoutAmount) : 0}
            </Text>
          </View>

          <TouchableOpacity
            style={{ marginTop: 30, marginBottom: 40 }}
            onPress={() =>
              dispatch(
                setTopUpSavingsModal({
                  status: true,
                  payload: currentSavings,
                }),
              )
            }
          >
            <View style={[styles.productButton, { backgroundColor: colors.greenColor, marginTop: 10 }]}>
              <Text style={styles.buttonText}>Top up</Text>
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

  statusNew: {
    backgroundColor: "blue",
    color: "#fff",
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
export default PurchasedSavingsItemModal;
