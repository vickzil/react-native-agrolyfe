import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../styles/colors";
import RadioForm from "react-native-simple-radio-button";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const SavingFrequency = ({ frequency, setFrequency, payload, item, allFrequencies }) => {
  return (
    <View style={[styles.productContainer]}>
      <View style={{ marginTop: 60, marginBottom: 10, width: "95%", paddingRight: 10 }}>
        <Text
          style={[
            styles.productCardContentItemLeft,
            {
              fontSize: 23,
              marginBottom: 20,
              fontWeight: "600",
              fontFamily: "Montserrat",
              letterSpacing: -0.35644,
              color: colors.greenDarkDarkColor,
            },
          ]}
        >
          How often do you want to save?
        </Text>
        <View style={{ marginTop: 20, marginBottom: 30 }}>
          <RadioForm
            radio_props={allFrequencies}
            // initial={0}
            buttonColor={colors.greenColor}
            selectedButtonColor={colors.greenColor}
            animation={true}
            labelStyle={{
              fontSize: 20,
              fontFamily: "Poppins",
              letterSpacing: -0.35644,
              paddingTop: 10,
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
