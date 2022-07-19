import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Keyboard, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/customs/CustomButton";
import CustomInput from "../components/customs/CustomInput";
import { validEmail } from "../components/helpers/globalFunction";
import Logo from "../components/logo/Logo";
import { setAlertModal, setLoading } from "../store/alert/alertSlice";
import colors from "../styles/colors";
import axios from "axios";
import SvgComponent from "../components/customs/SvgComponent";
import AnimatedView from "../components/customs/AnimatedView";

const Signin = ({ navigation }) => {
  const dispatch = useDispatch();
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const [inputs, setInputs] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      valid = false;
    } else if (validEmail(inputs.email) == false) {
      handleError("Please input valid email", "email");
      valid = false;
    }

    if (valid) {
      register();
    }

    Keyboard.dismiss();
  };

  const register = () => {
    dispatch(
      setLoading({
        status: true,
        message: "processing registration...",
      }),
    );

    let payload = {
      AppId: AppId,
      RequestId: RequestId,
      Email: inputs.email,
    };

    axios
      .post(`${baseURL}/v1.0/UserOnboard/addEmail`, payload, {
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
          let requestCode = response?.data?.data?.requestCode;

          AsyncStorage.setItem("Type", "REGISTRATION");
          navigation.navigate("InputCode", {
            code: requestCode,
            email: inputs.email,
          });
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

    // setTimeout(() => {
    //   dispatch(
    //     setLoading({
    //       status: false,
    //       message: "",
    //     }),
    //   );

    //   try {
    //     AsyncStorage.setItem("user", JSON.stringify(inputs));
    //     navigation.navigate("Login");
    //   } catch (error) {
    //     Alert.alert("Error", "Something went wrong");
    //   }
    // }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, fontFamily: "Poppins" }}>
      <SvgComponent />
      <ScrollView contentContainerStyle={{ paddingTop: 30, paddingHorizontal: 20, paddingBottom: 40 }}>
        <Logo />
        <Text
          style={{
            color: "black",
            fontSize: 22,
            fontWeight: "bold",
            fontFamily: "Poppins",
            textAlign: "center",
            paddingTop: 50,
          }}
        >
          Register
        </Text>
        <Text style={{ color: "gray", fontSize: 16, marginVertical: 10, textAlign: "center" }}>
          Create a secure account below
        </Text>

        <AnimatedView animation={"zoomInUp"} style={{ marginVertical: 20, marginTop: 40 }}>
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
            <CustomButton onPress={validate} title="Register" />
          </View>

          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: colors.greenDarkDarkColor,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "600",
              marginTop: 20,
              fontFamily: "Poppins",
            }}
          >
            Already have account? Login
          </Text>
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
