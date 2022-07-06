import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { KeycodeInput } from "react-native-keycode";
import Logo from "../components/logo/Logo";
import { globalStyles } from "../styles/global";
import colors from "../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { setAlertModal, setLoading } from "../store/alert/alertSlice";
import { saveUserInfo, setHasLogin, setToken } from "../store/auth/authSlice";
import axios from "axios";

const TwoFactor = ({ navigation }) => {
  const dispatch = useDispatch();

  const [pin, setPin] = useState(null);

  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  // const loginToken = AsyncStorage.getItem('loginToken')
  const userEmail = AsyncStorage.getItem("loginToken");
  const userData = AsyncStorage.getItem("userData");

  const handleConfirmToken = () => {
    dispatch(
      setLoading({
        status: true,
        message: "please wait...",
      }),
    );

    let payload = {
      AppId: AppId,
      RequestId: RequestId,
      Email: userEmail,
      token: pin,
    };

    console.log(payload);
    // console.log(bearerToken);

    axios
      .post(`${baseURL}/v1.0/OAuth/validate2FATokenAsync`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        console.log(response?.data);

        if (response?.data?.success == true) {
          const data = userData;
          const token = data.token.token;
          const expireTo = data.token.expireTo;

          dispatch(saveUserInfo(data));

          AsyncStorage.setItem("token", token);
          AsyncStorage.setItem("appexrat", expireTo);
          AsyncStorage.setItem("hasLoggedIn", "yes");

          dispatch(setToken(token));
          dispatch(setHasLogin(true));

          dispatch(
            setLoading({
              status: false,
              message: "",
            }),
          );
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
              title: "Error",
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

  useEffect(() => {
    return () => {
      dispatch(setSearchText(""));
      AsyncStorage.removeItem("loginToken");
      AsyncStorage.removeItem("loginToken");
      AsyncStorage.removeItem("userData");
    };
  }, []);
  //   const navigate = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, fontFamily: "Poppins" }}>
      <ScrollView contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 20, paddingBottom: 40 }}>
        <Logo />
        <View style={[styles.productContainer]}>
          <View style={{ justifyContent: "center", width: "80%", marginTop: 50, alignItems: "center" }}>
            <Text style={[styles.productCardContentItemLeft, { fontSize: 27, fontWeight: "900", marginBottom: 4 }]}>
              Two-Factor Verification
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
                handleConfirmToken();

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
export default TwoFactor;
