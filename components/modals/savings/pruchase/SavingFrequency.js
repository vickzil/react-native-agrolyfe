import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import CurrencyInput from "react-native-currency-input";
import { TextInputMask } from "react-native-masked-text";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import RadioGroup from "react-native-radio-buttons-group";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const SavingFrequency = ({ frequency, radioSelections, handleRadioButton }) => {
  return (
    <View style={[styles.productContainer]}>
      <View style={{ marginTop: 60, marginBottom: 10, width: "95%", paddingRight: 10 }}>
        <Text
          style={[
            styles.productCardContentItemLeft,
            {
              fontSize: 29,
              marginBottom: 35,
              fontWeight: "700",
              color: colors.greenDarkDarkColor,
              fontFamily: "Poppins",
              letterSpacing: -0.35644,
            },
          ]}
        >
          How often do you want to save?
        </Text>
        <View style={{ marginTop: 20, marginBottom: 30 }}>
          <RadioGroup
            value={frequency}
            containerStyle={{
              fontFamily: "Poppins",
              letterSpacing: -0.35644,
              alignItems: "flex-start",
              paddingVertical: 20,
              justifyContent: "space-between",
              fontSize: 30,
            }}
            radioButtons={radioSelections}
            onPress={handleRadioButton}
          />
        </View>
      </View>
    </View>
  );
};

export default SavingFrequency;

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    alignItems: "center",
  },
});
