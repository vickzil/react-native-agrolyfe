import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import CurrencyInput from "react-native-currency-input";
import { TextInputMask } from "react-native-masked-text";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const SavingAmount = ({ amount, setAmount }) => {
  return (
    <View style={[styles.productContainer]}>
      <View style={{ marginTop: 60, marginBottom: 10, width: "95%", paddingRight: 10 }}>
        <Text style={[styles.productCardContentItemLeft, { fontSize: 25, marginBottom: 35, fontWeight: "500" }]}>
          How much would you like to save?
        </Text>
        <View style={{ marginTop: 20, marginBottom: 30 }}>
          <Text style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 60, fontWeight: "800" }]}>
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
