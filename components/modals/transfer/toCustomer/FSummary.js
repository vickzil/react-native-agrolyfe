import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { addComma } from "../../../helpers/globalFunction";
import { globalStyles } from "../../../../styles/global";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const FSummary = ({ calculatedUser, amount, theme }) => {
  const user = useSelector((state) => state.oauth.user);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.productContainer, { marginBottom: 50 }]}>
        <View style={{ marginTop: 20, marginBottom: 10, width: "96%", paddingRight: 10 }}>
          <View style={styles.productCardContent}>
            <Text
              style={[
                styles.productCardContentItemRight,
                {
                  textAlign: "center",
                  fontSize: 20,
                  marginBottom: 35,
                  fontWeight: "700",
                  color: theme === "dark" ? "#fff" : colors.greenDarkDarkColor,
                  fontFamily: "Poppins",
                  letterSpacing: -0.35644,
                },
              ]}
            >
              Summary
            </Text>

            <View style={styles.productCard}>
              <View style={styles.productCardContent}>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>From</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    {user.firstName + " " + user.lastName}
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>To</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    {calculatedUser?.firstName + " " + calculatedUser?.lastName}
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Amount</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    {amount ? addComma(amount) : 0}
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Charges</Text>
                  <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                    ₦ 0.00
                  </Text>
                </View>
                <View style={[styles.productCardContentItem]}>
                  <Text style={[styles.productCardContentItemLeft, { fontWeight: "900", fontSize: 22 }]}>Total</Text>
                  <Text
                    style={[
                      styles.productCardContentItemRight,
                      { fontWeight: "900", color: "#555", fontFamily: "MontserratBold", fontSize: 22 },
                      theme === "dark" && globalStyles.textLight,
                    ]}
                  >
                    {amount ? addComma(amount) + ".00" : 0}
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
    // backgroundColor: "#fff",
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

export default FSummary;
