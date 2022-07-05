import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/global";
import colors from "../../styles/colors";

const CustomLoadingButton = ({ buttonText, emptyFields, onPress = () => {}, loading }) => {
  return (
    <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
      <View style={{ marginTop: 20, width: "100%" }}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={[globalStyles.button, emptyFields && { backgroundColor: colors.greenLightDarkColor }, { height: 60 }]}
          disabled={emptyFields}
        >
          {loading ? (
            <View style={{ flexDirection: "row" }}>
              <ActivityIndicator size="large" color="#fff" />
              {/* <Text
              style={[
                globalStyles.buttonText,
                { marginLeft: 5, fontSize: 16, marginTop: 19, fontWeight: "700", color: "#4d4b4b" },
              ]}
            >
              {buttonText}
            </Text> */}
            </View>
          ) : (
            <View style={{}}>
              <Text style={[globalStyles.buttonText, { margin: 0 }]}>{buttonText}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default CustomLoadingButton;
