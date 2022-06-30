import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { KeycodeInput } from "react-native-keycode";
import Logo from "../components/logo/Logo";
import { globalStyles } from "../styles/global";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/native";

const InputCode = ({ navigation }) => {
  const [pin, setPin] = useState(null);
  //   const navigate = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, fontFamily: "Poppins" }}>
      <ScrollView contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 20, paddingBottom: 40 }}>
        <Logo />
        <View style={[styles.productContainer]}>
          <View style={{ justifyContent: "center", width: "80%", marginTop: 50, alignItems: "center" }}>
            <Text style={[styles.productCardContentItemLeft, { fontSize: 27, fontWeight: "900", marginBottom: 4 }]}>
              Confirm Verification
            </Text>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={[globalStyles.label, { fontSize: 17, textAlign: "center" }]}>
                Enter your 4-digit CODE sent to your email to continue
              </Text>
            </View>
            <KeycodeInput
              style={{
                fontFamily: "Poppins",
                letterSpacing: -0.35644,
                borderColor: colors.greenColor,
                marginTop: 30,
              }}
              tintColor={colors.greenColor}
              alphaNumeric={false}
              numeric={true}
              keyboardType="numeric"
              onChange={(value) => {
                setPin(value);
              }}
              onComplete={(value) => {
                setPin(value);
                navigation.navigate("CompleteRegister");
                // console.log("completed");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 100,
  },
  productCardContentItemLeft: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginRight: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});
export default InputCode;
