import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetailsModal } from "../../store/alert/alertSlice";
import { globalStyles } from "../../styles/global";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.oauth.theme);

  return (
    <View style={[styles.productCard, theme === "dark" && globalStyles.cardDark]}>
      <View style={styles.productImage}>
        <Image
          source={{ uri: item.imageURL }}
          style={{ width: "100%", height: 250, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.productCardContent}>
        <Text style={[styles.productCardContentTitle, theme === "dark" && globalStyles.textLight]}>{item.name}</Text>

        <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>
          <View>
            <Text
              style={[
                {
                  fontSize: 15,
                  fontWeight: "600",
                  color: colors.greenLightDarkColor,
                  marginRight: 15,
                  fontFamily: "Poppins",
                },
              ]}
            >
              Duration
            </Text>
            <Text
              style={[
                {
                  fontSize: 15,
                  color: "#444",
                  fontWeight: "600",
                  justifyContent: "flex-end",
                  fontFamily: "Montserrat",
                },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              {item.duration} Months
            </Text>
          </View>
          <View>
            <Text
              style={[
                {
                  fontSize: 15,
                  fontWeight: "600",
                  color: colors.greenLightDarkColor,
                  marginRight: 15,
                  fontFamily: "Poppins",
                  textAlign: "right",
                },
              ]}
            >
              Rental fee (%)
            </Text>
            <Text
              style={[
                {
                  fontSize: 15,
                  color: "#444",
                  fontWeight: "600",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  textAlign: "right",
                  marginRight: 15,
                  fontFamily: "Montserrat",
                },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              {item.newInterestRate}%
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between", marginTop: 20 }}>
          <View>
            <Text
              style={[
                {
                  fontSize: 15,
                  fontWeight: "600",
                  color: colors.greenLightDarkColor,
                  marginRight: 15,
                  fontFamily: "Poppins",
                },
              ]}
            >
              State
            </Text>
            <Text
              style={[
                {
                  fontSize: 15,
                  color: "#444",
                  fontWeight: "600",
                  justifyContent: "flex-end",
                  fontFamily: "Poppins",
                },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              {item.state}
            </Text>
          </View>
          <View>
            <Text
              style={[
                {
                  fontSize: 15,
                  fontWeight: "600",
                  color: colors.greenLightDarkColor,
                  marginRight: 15,
                  fontFamily: "Poppins",
                  textAlign: "right",
                },
              ]}
            >
              Price per acre
            </Text>
            <Text
              style={[
                {
                  fontSize: 15,
                  color: "#444",
                  fontWeight: "600",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  textAlign: "right",
                  marginRight: 15,
                  fontFamily: "Montserrat",
                },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              {item.pricePerUnit} {item.unitOfMeasurement}
            </Text>
          </View>
        </View>
        {/* <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <View>
            <TouchableOpacity
              
              style={[styles.productButton, { backgroundColor: colors.greenColor, marginTop: 10, width: "100%" }]}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={[styles.productButton, { backgroundColor: colors.greenColor }]}
            activeOpacity={0.7}
            onPress={() =>
              dispatch(
                setProductDetailsModal({
                  status: true,
                  payload: item,
                }),
              )
            }
          >
            <Text style={styles.buttonText}>Purchase Land</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: "92%",
    justifyContent: "center",
    // paddingHorizontal: 4,
    // paddingVertical: 15,
    elevation: 1,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "#f0f0f0",
    marginBottom: 20,
  },

  productCardContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  productCardContentTitle: {
    fontSize: 17,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 20,
    fontFamily: "Poppins",
  },

  productButton: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 18,
    paddingHorizontal: 0,
    borderRadius: 8,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: "#dee2e6",
    elevation: 0.5,
  },

  buttonText: {
    width: "100%",
    fontSize: 15.5,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Poppins",
  },
});
export default ProductCard;
