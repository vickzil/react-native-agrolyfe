import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInputMask } from "react-native-masked-text";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const SavingAmount = ({ amount, setAmount, theme }) => {
  return (
    <View style={[styles.productContainer]}>
      <View style={{ marginTop: 60, marginBottom: 10, width: "95%", paddingRight: 10 }}>
        <Text
          style={[
            styles.productCardContentItemLeft,
            {
              fontSize: 19,
              marginBottom: 20,
              fontWeight: "600",
              fontFamily: "Montserrat",
              letterSpacing: -0.35644,
              color: colors.greenDarkDarkColor,
            },
            theme === "dark" && globalStyles.textLight,
          ]}
        >
          How much would you like to save?
        </Text>
        <View style={{ marginTop: 20, marginBottom: 30 }}>
          <Text
            style={[
              styles.productCardContentItemLeft,
              { fontSize: 15, marginBottom: 20, fontWeight: "800", fontFamily: "Poppins", letterSpacing: -0.35644 },
              theme === "dark" && globalStyles.textLightLight,
            ]}
          >
            Amount
          </Text>
          {/* <CurrencyInput
            value={frequency}
            onChangeValue={setAmount}
            prefix="₦ "
            delimiter=","
            // separator="."
            precision={0}
            onChangeText={(formattedValue) => {
              console.log(formattedValue);
            }}
            style={[globalStyles.inputTextt, globalStyles.inputContainer, { fontSize: 33, fontWeight: "800" }]}
          /> */}

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
            placeholderTextColor={theme === "dark" ? "#fff" : "444"}
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
            }}
            style={[
              { borderBottomWidth: 1, borderColor: colors.greenColor, height: 50, fontSize: 33, fontWeight: "700" },
              theme === "dark" && globalStyles.textLight,
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default SavingAmount;

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    alignItems: "center",
  },
});
