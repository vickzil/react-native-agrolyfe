import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { useDispatch } from "react-redux";
import IconSearch from "react-native-vector-icons/AntDesign";
import { setPurchaseDetailsModal } from "../../store/alert/alertSlice";

const PurchaseCard = ({ item }) => {
  const dispatch = useDispatch();

  const showDetails = () => {
    dispatch(
      setPurchaseDetailsModal({
        status: true,
        payload: null,
      }),
    );
  };

  return (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.7} onPress={() => showDetails()}>
      <View style={styles.productCardContent}>
        <View style={styles.productCardContentSub}>
          <Text style={styles.productCardContentSubTitle}>Purchased</Text>

          <IconSearch
            name="lock"
            size={17}
            style={[
              styles.searchIcon,
              {
                color: colors.greenDarkColor,
                marginLeft: 7,
                fontWeight: "900",
                textAlign: "center",
                fontFamily: "MontserratBold",
              },
            ]}
          />
        </View>

        <Text style={styles.productCardContentTitle}>agrolyfe_land_lag_001</Text>
        <View
          style={{
            width: "100%",
            backgroundColor: "rgba(24, 133, 111, 0.05)",
            height: 3,
            paddingHorizontal: 40,
            marginBottom: 30,
          }}
        ></View>
        <View style={{ flexDirection: "row", marginBottom: 32, justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenDarkColor,
                marginRight: 15,
                fontFamily: "Poppins",
              }}
            >
              Rental Fee (%)
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
              }}
            >
              20%
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenDarkColor,
                fontFamily: "Poppins",
                textAlign: "right",
              }}
            >
              Frequency
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
                textAlign: "right",
              }}
            >
              Monthly
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 32, justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenDarkColor,
                marginRight: 15,
                fontFamily: "Poppins",
              }}
            >
              Status
            </Text>
            <Text
              style={[
                styles.productCardContentItemRightStatus,
                {
                  color: "#fff",
                  fontWeight: "800",
                  justifyContent: "flex-start",
                  fontFamily: "Montserrat",
                },
              ]}
            >
              20%
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenDarkColor,
                fontFamily: "Poppins",
                textAlign: "right",
              }}
            >
              Maturity Date
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
                textAlign: "right",
              }}
            >
              15/05/2022, 8:23 pm
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                flexDirection: "row",
                justifyContent: "flex-end",
                color: colors.greenDarkColor,
                fontFamily: "Poppins",
                textAlign: "right",
              }}
            >
              Amount Purchased
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#444",
                fontWeight: "600",
                flexDirection: "row",
                justifyContent: "flex-start",
                fontFamily: "Montserrat",
                textAlign: "left",
              }}
            >
              ₦3,000
            </Text>
          </View>
          <View></View>
        </View>

        {/* <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={[styles.productButton, { backgroundColor: colors.greenDarkColor }]} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: "92%",
    justifyContent: "center",
    // paddingHorizontal: 4,
    // paddingVertical: 15,
    // elevation: 1,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 10,
    backgroundColor: "#ffae071a",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 20,
  },

  productCardContent: {
    paddingVertical: 19,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  productCardContentSub: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  productCardContentSubTitle: {
    fontSize: 17,
    // fontWeight: "800",
    fontFamily: "MontserratBold",
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
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 7,
    marginBottom: 20,
    fontFamily: "MontserratBold",
  },

  productButton: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 15,
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
export default PurchaseCard;
