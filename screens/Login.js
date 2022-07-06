import "../ignoreWarnings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Keyboard, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "../components/customs/CustomButton";
import CustomInput from "../components/customs/CustomInput";
import { validEmail } from "../components/helpers/globalFunction";
import Logo from "../components/logo/Logo";
import { setLoading } from "../store/alert/alertSlice";
import { setHasLogin, setToken } from "../store/auth/authSlice";
import colors from "../styles/colors";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const hasLogin = useSelector((state) => state.oauth.hasLogin);
  const [valid, setValid] = useState(false);
  // const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
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
  };

  const handleLogin = () => {
    dispatch(
      setLoading({
        status: true,
        message: "please wait...",
      }),
    );

    setTimeout(() => {
      dispatch(
        setLoading({
          status: false,
          message: "",
        }),
      );

      let userToken =
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InZpc2l0b3ItYXBwbGljYXRpb24tc2VydmVyLTIwMjEwMjIifQ.eyJwaWQiOiI2MDhmMjcwZDVlYjIwZTA5Y2YzOGE2Y2UiLCJ2aWQiOiIwNjdhYTYzYmVmZjdmNjQyMTc2MmQ2NjU4YTE0M2QyZDkwNTBjMWRmZDhmOGQ2MjcyNTBmNWM1MjVkMTNmN2JlIiwiaWF0IjoxNjQ1ODEzODE3LCJleHAiOjE2NDU4MTU2MTcsImp0aSI6Ik1QRDRwcWlXU19TUjNkREcwRC1KMiJ9.MD9zek0mcjJcEeeAwr6fxhnh7Tb1lKv0bXf7hNCWB5xj8-GcIkL2LJbCjARHKhDAWE4EtnDgDLJozeDAzZHJLA";

      AsyncStorage.setItem("token", userToken);
      AsyncStorage.setItem("hasLoggedIn", "yes");

      setTimeout(() => {
        dispatch(setToken(userToken));
        dispatch(setHasLogin(true));
      }, 200);
      setTimeout(() => {
        // navigation.navigate("Home");
      }, 1000);
    }, 3000);
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
        <Text style={{ color: "black", fontSize: 30, fontWeight: "bold", fontFamily: "Poppins", paddingTop: 0 }}>
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
