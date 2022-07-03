import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { globalStyles } from "../../../../styles/global";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const SavingsName = ({ name, setName }) => {
  return (
    <View style={[styles.productContainer]}>
      <View style={{ marginTop: 60, marginBottom: 10, width: "95%", paddingRight: 10 }}>
        <Text style={[styles.productCardContentItemLeft, { fontSize: 25, marginBottom: 35, fontWeight: "500" }]}>
          What would you like to name this plan?
        </Text>
        <Text
          style={[
            styles.productCardContentItemLeft,
            { fontSize: 16, marginBottom: -1, marginTop: 40, fontWeight: "500" },
          ]}
        >
          Name
        </Text>
        <View
          style={[globalStyles.inputContainer, { height: 57, borderWidth: 0, borderBottomWidth: 1.5, paddingLeft: 5 }]}
        >
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            autoCorrect={false}
            style={[globalStyles.inputTextt, { fontSize: 20, fontWeight: "700" }]}
          />
        </View>
      </View>
    </View>
  );
};

export default SavingsName;

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
});
