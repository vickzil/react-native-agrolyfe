import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { setSelectCardModal } from "../../../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { addComma, formateDateByName } from "../../../helpers/globalFunction";
import { globalStyles } from "../../../../styles/global";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const SavingSummary = ({ summaryDetails, paymentType, paymentDetails, theme }) => {
  const dispatch = useDispatch();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.productContainer, { marginBottom: 50 }]}>
        <View style={{ marginTop: 20, marginBottom: 10, width: "95%", paddingRight: 10 }}>
          <View style={styles.productCardContent}>
            <Text
              style={[
                styles.productCardContentItemRight,
                {
                  textAlign: "center",
                  fontSize: 20,
                  marginBottom: 35,
                  fontWeight: "600",
                  color: colors.greenDarkDarkColor,
                  fontFamily: "PoppinsBold",
                  letterSpacing: -0.35644,
                },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              Summary
            </Text>

            <View style={styles.productCard}>
              <View style={styles.productCardContent}>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Interest</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    {summaryDetails?.interestRate}%
                  </Text>
                </View>

                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Duration</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    {summaryDetails?.durationnMonths} months
                  </Text>
                </View>

                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Frequency</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    {summaryDetails?.frequency}
                  </Text>
                </View>

                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Vat Rate</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    {summaryDetails?.vatRate}%
                  </Text>
                </View>

                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>End Date</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    {formateDateByName(summaryDetails?.endDate)}
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Periodic Amount</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    ₦ {summaryDetails ? addComma(summaryDetails?.paymentAmountPerFrequency) : 0}
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Number of Payments</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    {summaryDetails?.totalNumberOfPayments}
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Target Amount</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    ₦ {summaryDetails ? addComma(summaryDetails?.targetAmount) : 0}
                  </Text>
                </View>

                {paymentType && paymentDetails ? (
                  <View style={styles.productCardContentItem}>
                    <View>
                      <Text style={styles.productCardContentItemLeft}>Payments Methods</Text>
                      <Text style={[styles.productCardContentItemLeft, { color: "#7a8716", fontWeight: "700" }]}>
                        {paymentType}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", width: "50%" }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ alignItems: "flex-end" }}
                        onPress={() =>
                          dispatch(
                            setSelectCardModal({
                              status: true,
                              type: "MAKE_SAVINGS",
                            }),
                          )
                        }
                      >
                        <Text
                          numberOfLines={1}
                          style={[styles.productCardContentItemRight, { color: "#3e87d6", fontSize: 16 }]}
                        >
                          {paymentDetails?.cardBankName}
                        </Text>
                        <Text
                          style={[
                            styles.productCardContentItemRight,
                            { color: "#3e87d6", fontSize: 15, fontWeight: "700" },
                          ]}
                        >
                          Switch
                        </Text>
                      </TouchableOpacity>

                      <Icon
                        name="chevron-right"
                        size={53}
                        style={[
                          styles.modalHeaderIcon,
                          { color: "#3e87d6", fontSize: 23, marginLeft: 10, marginRight: -19 },
                        ]}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={styles.productCardContentItem}>
                    <View>
                      <Text style={styles.productCardContentItemLeft}>Payments Methods</Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", width: "50%" }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ alignItems: "flex-end" }}
                        onPress={() =>
                          dispatch(
                            setSelectCardModal({
                              status: true,
                              type: "MAKE_SAVINGS",
                            }),
                          )
                        }
                      >
                        <Text
                          numberOfLines={1}
                          style={[styles.productCardContentItemRight, { color: "#3e87d6", fontSize: 16 }]}
                        >
                          Choose payment
                        </Text>
                      </TouchableOpacity>

                      <Icon
                        name="chevron-right"
                        size={53}
                        style={[
                          styles.modalHeaderIcon,
                          { color: "#3e87d6", fontSize: 23, marginLeft: 10, marginRight: -19 },
                        ]}
                      />
                    </View>
                  </View>
                )}
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
    height: "100%",
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
    // backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 20,
  },

  productCardContent: {
    paddingVertical: 10,
    paddingHorizontal: 0,
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
    fontSize: 15,
    fontWeight: "600",
    color: colors.greenLightDarkColor,
    marginRight: 15,
    fontFamily: "Poppins",
  },

  productCardContentItemRight: {
    fontSize: 15,
    color: "#444",
    fontWeight: "600",
    justifyContent: "flex-end",
    fontFamily: "Montserrat",
  },
});

export default SavingSummary;
