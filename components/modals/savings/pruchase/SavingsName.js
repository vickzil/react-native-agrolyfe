import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const SavingsName = ({ name, setName, theme }) => {
  return (
    <View style={[styles.productContainer]}>
      <View style={{ marginTop: 50, marginBottom: 10, width: "95%", paddingRight: 10 }}>
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
          What would you like to name this plan?
        </Text>
        <Text
          style={[
            styles.productCardContentItemLeft,
            {
              fontSize: 15,
              marginBottom: -1,
              marginTop: 40,
              fontWeight: "500",
              fontFamily: "Poppins",
              letterSpacing: -0.35644,
            },
            theme === "dark" && globalStyles.textLightLight,
          ]}
        >
          Saving Name
        </Text>
        <View
          style={[globalStyles.inputContainer, { height: 57, borderWidth: 0, borderBottomWidth: 1.5, paddingLeft: 5 }]}
        >
          <TextInput
            value={name}
            placeholderTextColor={theme === "dark" ? "#fff" : "#444"}
            onChangeText={(text) => setName(text)}
            autoCorrect={false}
            style={[
              globalStyles.inputTextt,
              { fontSize: 20, fontWeight: "700" },
              theme === "dark" && globalStyles.textLight,
            ]}
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
