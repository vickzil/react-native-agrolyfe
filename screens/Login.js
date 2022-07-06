import "../ignoreWarnings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Keyboard, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "../components/customs/CustomButton";
import CustomInput from "../components/customs/CustomInput";
import { validEmail } from "../components/helpers/globalFunction";
import Logo from "../components/logo/Logo";
import { setAlertModal, setLoading } from "../store/alert/alertSlice";
import { saveUserInfo, setHasLogin, setToken } from "../store/auth/authSlice";
import colors from "../styles/colors";
import axios from "axios";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const hasLogin = useSelector((state) => state.oauth.hasLogin);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);
  const [valid, setValid] = useState(false);
  // const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   if (!bearerToken) {
  //     getAuthentication();
  //   }
  // }, [bearerToken]);

  const validate = () => {
    setValid(true);
    if (!inputs.email) {
      handleError("Please input email", "email");
      setValid(false);
    } else if (validEmail(inputs.email) == false) {
      handleError("Please input valid email", "email");
      setValid(false);
    }

    if (!inputs.password) {
      handleError("Please input password", "passworld");
      setValid(false);
    }

    if (valid) {
      handleLogin();
    }
    Keyboard.dismiss();
  };

  const handleLogin = () => {
    dispatch(
      setLoading({
        status: true,
        message: "please wait...",
      }),
    );

    let payload = {
      AppId: AppId,
      RequestId: RequestId,
      Email: inputs.email,
      Password: inputs.password,
    };

    // console.log(payload);
    // console.log(bearerToken);

    axios
      .post(`${baseURL}/v1.0/OAuth/login`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        console.log(response?.data);

        if (response?.data?.success == true) {
          if (response?.data?.data?.emailConfirmed) {
            const twoFactor = response.data.data.token.twoFactorToken;
            const data = response.data.data;
            const token = response.data.data.token.token;
            const expireTo = response.data.data.token.expireTo;

            if (twoFactor) {
              dispatch(
                setLoading({
                  status: false,
                  message: "",
                }),
              );

              AsyncStorage.setItem("loginToken", token);
              AsyncStorage.setItem("userEmail", inputs.email);
              AsyncStorage.setItem("userData", data);

              navigation.navigate("TwoFactor");
            } else {
              AsyncStorage.setItem("user", JSON.stringify(data));
              AsyncStorage.setItem("token", token);
              AsyncStorage.setItem("appexrat", expireTo);
              AsyncStorage.setItem("hasLoggedIn", "yes");

              dispatch(saveUserInfo(data));
              dispatch(setToken(token));
              dispatch(setHasLogin(true));

              dispatch(
                setLoading({
                  status: false,
                  message: "",
                }),
              );
            }
          } else {
            navigation.navigate("InputCode");
            AsyncStorage.setItem("CONFIRMTYPE", "LOGIN");

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

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, fontFamily: "Poppins" }}>
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Logo />
        <Text
          style={{
            color: "black",
            fontSize: 30,
            fontWeight: "bold",
            fontFamily: "Poppins",
            paddingTop: 0,
            letterSpacing: -0.35644,
          }}
        >
          {hasLogin ? "Welcome Back" : "Login"}
        </Text>
        <Text style={{ color: "gray", fontSize: 17, marginVertical: 10 }}>Please sign in to your account</Text>

        <View style={{ marginVertical: 20 }}>
          <CustomInput
            error={errors.email}
            onChangeText={(text) => handleOnChange(text, "email")}
            onFocus={() => {
              handleError(null, "email");
            }}
            placeholder="Enter your email"
            lable="Email"
            iconName="email-outline"
          />

          <View>
            <TouchableOpacity>
              <Text
                onPress={() => navigation.navigate("ForgotPassword")}
                style={{
                  color: colors.greenColor,
                  textAlign: "right",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: -7,
                  fontFamily: "Poppins",
                  letterSpacing: -0.35644,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <CustomInput
            error={errors.password}
            onChangeText={(text) => handleOnChange(text, "password")}
            placeholder="Enter your password"
            lable="Password"
            onFocus={() => {
              handleError(null, "password");
            }}
            iconName="lock-outline"
            password={true}
          />
          <View style={{ marginTop: 40 }}>
            <CustomButton onPress={validate} valid={valid} title=" Login" />
          </View>
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{
              color: colors.greenDarkDarkColor,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 20,
              fontFamily: "Poppins",
              letterSpacing: -0.35644,
            }}
          >
            Don't have account? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
