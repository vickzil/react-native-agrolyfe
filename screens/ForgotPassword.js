import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef, useState } from "react";
import { Alert, Keyboard, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "../components/customs/CustomButton";
import CustomInput from "../components/customs/CustomInput";
import { validEmail } from "../components/helpers/globalFunction";
import Logo from "../components/logo/Logo";
import ConfirmationModalButtom from "../components/modals/ConfirmationModalButtom";
import { setAlertModal, setLoading } from "../store/alert/alertSlice";
import colors from "../styles/colors";
import axios from "axios";
import SvgComponent from "../components/customs/SvgComponent";
import AnimatedView from "../components/customs/AnimatedView";
import { globalStyles } from "../styles/global";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";

const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const confirmationModal = useRef();
  const theme = useSelector((state) => state.oauth.theme);

  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const [inputs, setInputs] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

  const closeModal = () => {
    confirmationModal.current.close();
    navigation.navigate("Login");
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      valid = false;
    } else if (validEmail(inputs.email) == false) {
      handleError("Please input valid email", "email");
      valid = false;
    }

    if (valid) {
      handleForgotPassword();
    }
  };

  const handleForgotPassword = () => {
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
    };

    axios
      .post(`${baseURL}/v1.0/OAuth/forgotPassword`, payload, {
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

          confirmationModal.current.show();
          setInputs((prevState) => ({ ...prevState, email: "" }));
          // navigation.navigate("Login");
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
              title: " Error",
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
    <SafeAreaView
      style={[
        { backgroundColor: "#fff", flex: 1, fontFamily: "Poppins" },
        theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
      ]}
    >
      <SvgComponent />
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkBody} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <ConfirmationModalButtom
        bottomSheet={confirmationModal}
        closeModal={closeModal}
        message="A reset password link has been sent to your email address if you have an account with us. Kindly follow the link to complete the process."
      />
      <ScrollView contentContainerStyle={{ paddingTop: 30, paddingHorizontal: 20 }}>
        <Logo />
        <Text
          style={[
            {
              color: "black",
              fontSize: 22,
              fontWeight: "bold",
              fontFamily: "Poppins",
              paddingTop: 70,
              textAlign: "center",
            },
            theme === "dark" && globalStyles.textLight,
          ]}
        >
          Forgot Password
        </Text>
        <Text
          style={{ color: theme === "dark" ? "#aaa" : "gray", fontSize: 16, marginVertical: 10, textAlign: "center" }}
        >
          Lets get you a new password
        </Text>

        <AnimatedView animation={"zoomInUp"} style={{ marginVertical: 20 }}>
          <CustomInput
            error={errors.email}
            onChangeText={(text) => handleOnChange(text.replace(/\s/g, ""), "email")}
            onFocus={() => {
              handleError(null, "email");
            }}
            placeholder="Enter your email"
            lable="Email"
            iconName="email-outline"
          />

          <View style={{ marginTop: 40 }}>
            <CustomButton onPress={validate} title="Send resend link" />
          </View>
          <Text
            onPress={() => navigation.navigate("Login")}
            // onPress={() => confirmationModal.current.show()}
            style={{
              color: colors.greenColor,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "600",
              marginTop: 30,
              fontFamily: "Poppins",
            }}
          >
            Go Back to Login
          </Text>
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
