import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { useDispatch } from "react-redux";
import { setProductDetailsModal } from "../../store/alert/alertSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.productCard}>
      <View style={styles.productImage}>
        <Image
          source={{ uri: item.imageURL }}
          style={{ width: "100%", height: 110, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.productCardContent}>
        <Text style={styles.productCardContentTitle}>{item.name}</Text>

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
                fontSize: 16,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
              }}
            >
              {item.duration} Months
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenLightDarkColor,
                marginRight: 15,
                fontFamily: "Poppins",
                textAlign: "right",
              }}
            >
              Rental fee (%)
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                textAlign: "right",
                marginRight: 15,
                fontFamily: "Montserrat",
              }}
            >
              {item.newInterestRate}%
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between", marginTop: 20 }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenColor,
                marginRight: 15,
                fontFamily: "Poppins",
              }}
            >
              State
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Poppins",
              }}
            >
              {item.state}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenLightDarkColor,
                marginRight: 15,
                fontFamily: "Poppins",
                textAlign: "right",
              }}
            >
              Price per acre
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                textAlign: "right",
                marginRight: 15,
                fontFamily: "Montserrat",
              }}
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
            style={[styles.productButton, { backgroundColor: "#fff" }]}
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
            <Text style={styles.buttonText}>Farm land Descriptions</Text>
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
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    paddingVertical: 18,
    paddingHorizontal: 70,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dee2e6",
    elevation: 0.5,
  },

  buttonText: {
    width: "100%",
    fontSize: 16.5,
    textAlign: "center",
    color: "#222",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});
export default ProductCard;
