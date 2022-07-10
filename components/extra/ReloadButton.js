import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/global";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const ReloadButton = () => {
  return (
    <View style={[globalStyles.resendPinContainer, { marginTop: 20, alignItems: "center" }]}>
      <TouchableOpacity
        style={[globalStyles.resendPinButton, { paddingHorizontal: 10, paddingVertical: 5 }]}
        activeOpacity={0.3}
        //   onPress={() => removeUser()}
      >
        <View style={[globalStyles.resendPinFlex, { justifyContent: "center" }]}>
          <EvilIcons name="redo" size={21} style={[{ color: "#111", padding: 2, marginRight: 6 }]} />

          <Text>Refresh Balance</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ReloadButton;

const styles = StyleSheet.create({});
