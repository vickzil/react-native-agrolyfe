import { Dimensions, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import { KeycodeInput } from "react-native-keycode";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const FConfirm = ({ pin, setPin, step }) => {
  const [autoF, setAutoF] = useState(false);

  useEffect(() => {
    if (step === 3) {
      setAutoF(true);
    } else {
      setAutoF(false);
    }
  }, [step]);

  return (
    <View style={[styles.productContainer]}>
      <View style={{ justifyContent: "center", width: "80%", marginTop: 50, alignItems: "center" }}>
        <Text style={[styles.productCardContentItemLeft, { fontSize: 22, fontWeight: "900", marginBottom: 4 }]}>
          Transaction Pin
        </Text>
        <View style={{ alignItems: "center" }}>
          <Text style={[globalStyles.label, { fontSize: 15, textAlign: "center" }]}>
            Enter your 4-digit TRANSACTION PIN to approve this transfer
          </Text>
        </View>
        <KeycodeInput
          style={{ fontFamily: "Poppins", letterSpacing: -0.35644 }}
          alphaNumeric={false}
          autoFocus={autoF}
          numeric={true}
          tintColor={colors.greenColor}
          keyboardType="numeric"
          onChange={(value) => {
            setPin(value);
          }}
          onComplete={(value) => {
            setPin(value);
          }}
        />
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
