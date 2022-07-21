import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import IconSearch from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { setMySavingsDetailsModal } from "../../store/alert/alertSlice";
import { addComma } from "../helpers/globalFunction";
import { globalStyles } from "../../styles/global";

const MySavingsCard = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.oauth.theme);

  return (
    <TouchableOpacity
      style={[styles.productCard, theme === "dark" && globalStyles.cardDark]}
      activeOpacity={0.7}
      onPress={() =>
        dispatch(
          setMySavingsDetailsModal({
            status: true,
            payload: item,
          }),
        )
      }
    >
      <View style={styles.productCardContent}>
        <View style={styles.productCardContentSub}>
          <Text style={[styles.productCardContentSubTitle, theme === "dark" && globalStyles.textLightLight]}>
            {item?.savingsMainCategoryCode}
          </Text>

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
              theme === "dark" && globalStyles.textLightLight,
            ]}
          />
        </View>

        <Text style={[styles.productCardContentTitle, theme === "dark" && globalStyles.textLight]}>{item?.allias}</Text>
        <View
          style={[
            { width: "100%", backgroundColor: "#fff", height: 3, paddingHorizontal: 40, marginBottom: 30 },
            theme === "dark" && { backgroundColor: colors.greenDarkColor },
          ]}
        ></View>
        <View style={{ flexDirection: "row", marginBottom: 22, justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenLightDarkColor,
                marginRight: 15,
                fontFamily: "Poppins",
              }}
            >
              Interest Rate
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: theme === "dark" ? "#fff" : "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
              }}
            >
              {item.interestRate}%
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenLightDarkColor,
                fontFamily: "Poppins",
                textAlign: "right",
              }}
            >
              Status
            </Text>

            <Text
              style={[
                styles.productCardContentItemRightStatus,
                {
                  fontSize: 18,
                  color: theme === "dark" ? "#fff" : "#444",
                  fontWeight: "600",
                  justifyContent: "flex-end",
                  fontFamily: "Montserrat",
                  textAlign: "right",
                },
                item.status === "running" ? styles.statusSuccess : null,
                item.status === "new" ? styles.statusNew : null,
              ]}
            >
              {item?.status}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenLightDarkColor,
                marginRight: 15,
                fontFamily: "Poppins",
              }}
            >
              Duration
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: theme === "dark" ? "#fff" : "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
              }}
            >
              {item.duration} months
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                flexDirection: "row",
                justifyContent: "flex-end",
                color: colors.greenLightDarkColor,
                fontFamily: "Poppins",
                textAlign: "right",
              }}
            >
              Minimum Amount
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: theme === "dark" ? "#fff" : "#444",
                fontWeight: "600",
                flexDirection: "row",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
                textAlign: "right",
              }}
            >
              ₦{addComma(item?.totalTargetAmountPaid)}
            </Text>
          </View>
        </View>

        {/* <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={[styles.productButton, { backgroundColor: colors.greenColor }]} activeOpacity={0.7}>
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
    // backgroundColor: "#effaff",
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
export default MySavingsCard;
