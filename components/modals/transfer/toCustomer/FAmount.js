import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TextInputMask } from "react-native-masked-text";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import { setSelectBankModal, setSelectCardModal } from "../../../../store/alert/alertSlice";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const FAmount = ({ amount, setAmount, calculatedUser }) => {
  const dispatch = useDispatch();

  return (
    <View style={[styles.productContainer]}>
      <View style={{ marginTop: 30, marginBottom: 10, width: "90%", paddingRight: 10 }}>
        {calculatedUser && (
          <View style={{ marginBottom: 50 }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}>
              <View style={globalStyles.accountImage}>
                <Image
                  source={{ uri: calculatedUser?.photo }}
                  style={[{ width: "100%", height: "100%", borderRadius: 100 }]}
                  resizeMode="cover"
                />
              </View>

              <Text style={[globalStyles.accountUserFullName, { fontSize: 14 }]}>
                {calculatedUser?.firstName + " " + calculatedUser?.lastName}
              </Text>
              <Text style={[globalStyles.accountTitle, { fontSize: 16, fontFamily: "PoppinsBold" }]}>
                {calculatedUser?.userName}
              </Text>
            </View>
          </View>
        )}

        <View>
          <View style={{ marginTop: 0, marginBottom: 30, alignItems: "center" }}>
            <Text
              style={[
                styles.productCardContentItemLeft,
                {
                  fontSize: 18,
                  marginBottom: 20,
                  fontWeight: "800",
                  fontFamily: "Poppins",
                  letterSpacing: -0.35644,
                  color: colors.greenDarkDarkColor,
                },
              ]}
            >
              Amount
            </Text>

            <TextInputMask
              type={"money"}
              options={{
                precision: 0,
                //   separator: ",",
                delimiter: ",",
                unit: "₦",
                suffixUnit: "",
              }}
              placeholder="0"
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
              }}
              style={[
                {
                  width: "80%",
                  height: 55,
                  // backgroundColor: "#fff",
                  flexDirection: "row",
                  paddingHorizontal: 15,
                  borderBottomWidth: 2,
                  borderColor: colors.greenColor,
                  alignItems: "center",
                  borderRadius: 8,
                  fontSize: 33,
                  fontWeight: "700",
                  textAlign: "center",
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FAmount;

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    alignItems: "center",
  },

  productCardContentItem: {
    flexDirection: "row",
    paddingBottom: 25,
    paddingTop: 26,
    marginBottom: 26,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },

  productCardContentItemLeft: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginRight: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  productCardContentItemRight: {
    fontSize: 16,
    color: "#444",
    fontWeight: "600",
    justifyContent: "flex-end",
    fontFamily: "Montserrat",
  },
});
