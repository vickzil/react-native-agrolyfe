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

const userImage = require("../../../../assets/img/user.jpg");

const FAmount = ({ amount, setAmount, user }) => {
  const dispatch = useDispatch();

  return (
    <View style={[styles.productContainer]}>
      <View style={{ marginTop: 30, marginBottom: 10, width: "95%", paddingRight: 10 }}>
        <View style={{ marginBottom: 50 }}>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}>
            <View style={globalStyles.accountImage}>
              <Image
                source={userImage}
                style={[{ width: "100%", height: "100%", borderRadius: 100 }]}
                resizeMode="cover"
              />
            </View>

            <Text style={globalStyles.accountUserFullName}>Victor Nwakwue</Text>
            <Text style={globalStyles.accountTitle}>{user?.userName}</Text>
          </View>
        </View>
        <View>
          <View style={{ marginTop: 0, marginBottom: 30 }}>
            <Text
              style={[
                styles.productCardContentItemLeft,
                {
                  fontSize: 20,
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
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
              }}
              style={[
                { borderBottomWidth: 1, borderColor: colors.greenColor, height: 50, fontSize: 33, fontWeight: "700" },
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
