import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { KeycodeInput } from "react-native-keycode";
import Logo from "../components/logo/Logo";
import { globalStyles } from "../styles/global";
import colors from "../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setAlertModal, setLoading } from "../store/alert/alertSlice";
import axios from "axios";
import SvgComponent from "../components/customs/SvgComponent";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";

const InputCode = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { code, email } = route.params;

  const [pin, setPin] = useState(null);
  //   const navigate = useNavigation();
  const theme = useSelector((state) => state.oauth.theme);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  // useEffect(() => {
  //   return () => {
  //     dispatch(setSearchText(""));
  //     dispatch(getAllEarnings());
  //   };
  // }, [dispatch]);

  const handleVerifyCode = (value) => {
    Keyboard.dismiss();

    dispatch(
      setLoading({
        status: true,
        message: "please wait...",
      }),
    );

    let payload = {
      AppId: AppId,
      RequestId: RequestId,
      RequestCode: JSON.parse(JSON.stringify(code)),
      Email: JSON.parse(JSON.stringify(email)),
      OTP: value,
    };

    // console.log(payload);

    axios
      .post(`${baseURL}/v1.0/UserOnboard/validateOTP`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          dispatch(
            setLoading({
              status: false,
              message: "",
            }),
          );

          navigation.navigate("CompleteRegister", { email: email, code: code });
        } else {
          dispatch(
            setLoading({
              status: false,
              message: "",
            }),
          );

          dispatch(
            setAlertModal({
              status: true,
              type: "error",
              title: "Login Error",
              des: response.data.message,
              payload: null,
            }),
          );
        }
      })
      .catch(() => {
        dispatch(
          setLoading({
            status: false,
            message: "",
          }),
        );

        dispatch(
          setAlertModal({
            status: true,
            type: "error",
            title: "Service Error",
            des: "Service is temporarily unavailable. Please try again in a few minutes.",
            payload: null,
          }),
        );
      });
  };

  const customColor = theme === "dark" ? "#fff" : "#333";

  return (
    <SafeAreaView
      style={{ backgroundColor: theme === "dark" ? colors.darkBody : "#fff", flex: 1, fontFamily: "Poppins" }}
    >
      <SvgComponent />
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkBody} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}
      <ScrollView contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 20, paddingBottom: 40 }}>
        <Logo />
        <View style={[styles.productContainer]}>
          <View style={{ justifyContent: "center", width: "80%", marginTop: 50, alignItems: "center" }}>
            <Text
              style={[
                styles.productCardContentItemLeft,
                { fontSize: 22, fontWeight: "900", marginBottom: 4, fontFamily: "Poppins" },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              Confirm Verification
            </Text>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text
                style={[
                  globalStyles.label,
                  { fontSize: 16, textAlign: "center", fontFamily: "Poppins", fontWeight: "600" },
                  theme === "dark" && globalStyles.textLightLight,
                ]}
              >
                Enter your 4-digit CODE sent to your email to continue
              </Text>
            </View>
            <KeycodeInput
              style={{
                fontFamily: "Poppins",
                letterSpacing: -0.35644,
                borderColor: colors.greenColor,
                marginTop: 30,

                backgroundColor: theme === "dark" ? "#aaa" : 0,
                borderRadius: theme === "dark" ? 6 : 0,
              }}
              textColor={customColor}
              tintColor={colors.greenColor}
              autoFocus={true}
              alphaNumeric={false}
              numeric={true}
              keyboardType="numeric"
              onChange={(value) => {
                setPin(value);
              }}
              onComplete={(value) => {
                handleVerifyCode(value);
                // navigation.navigate("CompleteRegister");
                // console.log("completed");
              }}
            />
            <View style={{ marginTop: 70 }}>
              <Text
                onPress={() => navigation.navigate("Login")}
                style={{
                  color: colors.greenColor,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                  marginTop: 20,
                  fontFamily: "Poppins",
                }}
              >
                Back to Login
              </Text>
            </View>
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
