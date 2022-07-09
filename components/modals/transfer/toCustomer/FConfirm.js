import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import { KeycodeInput } from "react-native-keycode";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useDispatch, useSelector } from "react-redux";
import { resendUserTransactionPin } from "../../../../store/auth/actions";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const FConfirm = ({ pin, setPin, step }) => {
  const resendPinLoading = useSelector((state) => state.oauth.resendPinLoading);
  const [autoF, setAutoF] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (step === 3) {
      setAutoF(true);
    } else {
      setAutoF(false);
    }
  }, [step]);

  const sendTransactionPin = () => {
    dispatch(resendUserTransactionPin());
  };

  return (
    <View style={[styles.productContainer]}>
      <View style={{ justifyContent: "center", width: "90%", marginTop: 50, alignItems: "center", marginLeft: -20 }}>
        <Text style={[styles.productCardContentItemLeft, { fontSize: 28, fontWeight: "900", marginBottom: 4 }]}>
          Transaction Pin
        </Text>
        <View style={{ alignItems: "center", marginBottom: 60 }}>
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

        <View style={styles.resendPinContainer}>
          <TouchableOpacity style={styles.resendPinButton} activeOpacity={0.3} onPress={() => sendTransactionPin()}>
            <View style={styles.resendPinFlex}>
              {resendPinLoading === true ? (
                <ActivityIndicator size="small" color="#14961E" style={{ marginRight: 6 }} />
              ) : (
                <EvilIcons name="redo" size={21} style={[{ color: "#111", padding: 2 }]} />
              )}

              <Text>Resend Pin</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    color: "#333",
    marginRight: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  resendPinContainer: {
    marginTop: 90,
  },

  resendPinButton: {
    backgroundColor: "#fff",
    color: "#222",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.greenColor,
  },

  resendPinFlex: {
    flexDirection: "row",
    alignItems: "center",
  },
});
