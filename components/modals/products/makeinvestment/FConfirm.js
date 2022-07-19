import { Dimensions, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import React from "react";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import { setTermsAndCModal } from "../../../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const FConfirm = ({ isEnabled, setIsEnabled }) => {
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const agreeTerms = useSelector((state) => state.oauth.agreeTerms);

  const dispatch = useDispatch();

  return (
    <View style={[styles.productContainer]}>
      <View
        style={{
          marginTop: 50,
          marginBottom: 10,
          width: "95%",
          paddingRight: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            styles.productCardContentItemLeft,
            { fontSize: 22, fontWeight: "600", marginBottom: 6, color: "#444", fontFamily: "PoppinsBold" },
          ]}
        >
          Confirm Purchase
        </Text>

        <View style={{ alignItems: "center" }}>
          <Text
            style={[
              globalStyles.label,
              {
                fontSize: 15,
                textAlign: "center",
                fontWeight: "600",
                fontFamily: "Poppins",
                marginBottom: 6,
              },
            ]}
          >
            Are you sure you want to purchase this products
          </Text>

          <Text
            style={[
              globalStyles.label,
              {
                fontSize: 15,
                textAlign: "center",
                fontWeight: "600",
                fontFamily: "Poppins",
                marginBottom: 60,
              },
            ]}
          >
            I certify that I have read, understand and accept{" "}
            <Text
              style={{ color: colors.greenColor, fontFamily: "PoppinsBold" }}
              onPress={() => dispatch(setTermsAndCModal(true))}
            >
              {" "}
              Terms & Conditions
            </Text>
          </Text>
        </View>
        <View style={{ marginTop: 60 }}>
          <Switch
            trackColor={{ false: "#767577", true: colors.greenLightColor }}
            thumbColor={isEnabled ? colors.greenColor : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 2.5 }, { scaleY: 2.4 }] }}
          />
        </View>
      </View>
    </View>
  );
};

export default FConfirm;

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },

  productCardContentItemLeft: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginRight: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});
