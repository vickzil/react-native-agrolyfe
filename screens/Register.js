import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Keyboard, Text, View, ScrollView, SafeAreaView } from "react-native";
import CustomButton from "../components/customs/CustomButton";
import CustomInput from "../components/customs/CustomInput";
import { validEmail } from "../components/helpers/globalFunction";
import Loader from "../components/loader/Loader";
import Logo from "../components/logo/Logo";

const Signin = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
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

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      valid = false;
    }
    if (!inputs.phone) {
      handleError("Please input phone", "phone");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "passworld");
      valid = false;
    } else if (!inputs.password.length < 5) {
      handleError("Min password length of 5", "passworld");
    }

    if (valid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

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
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 20, paddingBottom: 40 }}>
        <Logo />
        <Text style={{ color: "black", fontSize: 30, fontWeight: "bold", fontFamily: "Poppins" }}>Register</Text>
        <Text style={{ color: "gray", fontSize: 17, marginVertical: 10 }}>Enter Your Details to Register</Text>

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
          <CustomInput
            error={errors.fullname}
            onChangeText={(text) => handleOnChange(text, "fullname")}
            onFocus={() => {
              handleError(null, "fullname");
            }}
            placeholder="Enter your fullname"
            lable="Fullname"
            iconName="account-outline"
          />
          <CustomInput
            error={errors.phone}
            onChangeText={(text) => handleOnChange(text, "phone")}
            keyboardType="numeric"
            onFocus={() => {
              handleError(null, "phone");
            }}
            placeholder="Enter your phone number"
            lable="Phone"
            iconName="phone-outline"
          />
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
          <CustomButton onPress={validate} title="Register" />
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{ color: "black", textAlign: "center", fontSize: 16, fontWeight: "bold", marginTop: 20 }}
          >
            Already have account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
