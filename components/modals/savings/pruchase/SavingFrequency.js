import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../styles/colors";
import RadioForm from "react-native-simple-radio-button";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const SavingFrequency = ({ frequency, setFrequency }) => {
  const radioButtonsData = [
    {
      label: "Once a day",
      value: "daily",
    },
    {
      label: "Once a week",
      value: "weekly",
    },
    {
      label: "Once a month",
      value: "monthly",
    },
  ];

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
          <RadioForm
            radio_props={radioButtonsData}
            // initial={0}
            buttonColor={colors.greenColor}
            selectedButtonColor={colors.greenColor}
            animation={true}
            labelStyle={{
              fontSize: 20,
              fontFamily: "Poppins",
              letterSpacing: -0.35644,
              marginTop: 10,
              marginBottom: 40,
            }}
            onPress={(value) => {
              setFrequency(value);
            }}
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
