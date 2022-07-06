import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Keyboard, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import CustomButton from "../components/customs/CustomButton";
import CustomInput from "../components/customs/CustomInput";
import { validEmail } from "../components/helpers/globalFunction";
import Logo from "../components/logo/Logo";
import { setLoading } from "../store/alert/alertSlice";
import colors from "../styles/colors";

const Signin = ({ navigation }) => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

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
      register();
    }
  };

  const register = () => {
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

      try {
        AsyncStorage.setItem("user", JSON.stringify(inputs));
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
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
      <ScrollView contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 20, paddingBottom: 40 }}>
        <Logo />
        <Text style={{ color: "black", fontSize: 30, fontWeight: "bold", fontFamily: "Poppins" }}>Register</Text>
        <Text style={{ color: "gray", fontSize: 17, marginVertical: 10 }}>Create a secure account below</Text>

        <View style={{ marginVertical: 20, marginTop: 40 }}>
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
          <View style={{ marginTop: 40 }}>
            <CustomButton onPress={validate} title="Register" />
          </View>

          <Text
            onPress={() => navigation.navigate("InputCode")}
            style={{
              color: colors.greenDarkDarkColor,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Already have account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
