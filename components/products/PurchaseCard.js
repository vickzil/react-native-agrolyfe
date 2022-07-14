import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { useDispatch } from "react-redux";
import IconSearch from "react-native-vector-icons/AntDesign";
import { setPurchaseDetailsModal } from "../../store/alert/alertSlice";
import { addComma, formateDateAndTimeByName, formateDateByName } from "../helpers/globalFunction";

const PurchaseCard = ({ item }) => {
  const dispatch = useDispatch();

  const showDetails = () => {
    dispatch(
      setPurchaseDetailsModal({
        status: true,
        payload: item,
      }),
    );
  };

  return (
    <View style={styles.productCard}>
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

        <Text style={styles.productCardContentTitle}>{item?.availableInvestmentName}</Text>
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
                fontSize: 15,
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
                fontSize: 15,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
              }}
            >
              {item?.newInterestRate}%
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 15,
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
                fontSize: 15,
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
                fontSize: 15,
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
                  textTransform: "capitalize",
                },
                item.status === "running" ? styles.statusSuccess : null,
              ]}
            >
              {item?.status}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 15,
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
                fontSize: 15,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
                textAlign: "right",
              }}
            >
              {formateDateByName(item.maturityDate)}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: colors.greenDarkColor,
                marginRight: 15,
                fontFamily: "Poppins",
              }}
            >
              Duration
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
              }}
            >
              {item?.duration} Months
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 15,
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
                fontSize: 15,
                color: "#444",
                fontWeight: "600",
                flexDirection: "row",
                justifyContent: "flex-start",
                fontFamily: "Montserrat",
                textAlign: "right",
              }}
            >
              ₦{addComma(item?.amountInvested)}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={[styles.productButton, { backgroundColor: colors.greenColor, marginTop: 10 }]}
            activeOpacity={0.7}
            onPress={() => showDetails()}
          >
            <Text style={styles.buttonText}>Purchase Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: "99%",
    justifyContent: "center",
    // paddingHorizontal: 4,
    // paddingVertical: 15,
    // elevation: 1,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 20,
  },

  productCardContent: {
    paddingVertical: 19,
    paddingHorizontal: 15,
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
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 7,
    marginBottom: 20,
    fontFamily: "MontserratBold",
  },

  productButton: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15.5,
    fontWeight: "600",
    fontFamily: "Poppins",
  },
});
export default PurchaseCard;
