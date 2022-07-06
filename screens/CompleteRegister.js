import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import CustomButton from "../components/customs/CustomButton";
import CustomInput from "../components/customs/CustomInput";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";
import { removeFormatDate, validEmail } from "../components/helpers/globalFunction";
import Logo from "../components/logo/Logo";
import { setLoading } from "../store/alert/alertSlice";
import colors from "../styles/colors";
import { globalStyles } from "../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CompleteRegister = ({ navigation }) => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
  });
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

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

    if (!inputs.firstname) {
      handleError("Please input firstname", "firstname");
      setValid(false);
    }
    if (!inputs.lastname) {
      handleError("Please input lastname", "lastname");
      setValid(false);
    }
    if (!inputs.phone) {
      handleError("Please input phone", "phone");
      setValid(false);
    }

    if (!inputs.password) {
      handleError("Please input password", "passworld");
      setValid(false);
    } else if (!inputs.password.length < 5) {
      handleError("Min password length of 5", "passworld");
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
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 20, paddingBottom: 40 }}>
        <Logo />
        <Text style={{ color: "black", fontSize: 30, fontWeight: "bold", fontFamily: "Poppins" }}>Nice Work!</Text>
        <Text style={{ color: "gray", fontSize: 17, marginVertical: 10 }}>Please complete your registration</Text>

        <View style={{ marginVertical: 20 }}>
          <CustomInput
            error={errors.firstname}
            onChangeText={(text) => handleOnChange(text, "firstname")}
            onFocus={() => {
              handleError(null, "firstname");
            }}
            placeholder="Enter your firstname"
            lable="firstname"
            iconName="account-outline"
          />
          <CustomInput
            error={errors.lastname}
            onChangeText={(text) => handleOnChange(text, "lastname")}
            onFocus={() => {
              handleError(null, "lastname");
            }}
            placeholder="Enter your lastname"
            lable="lastname"
            iconName="account-outline"
          />
          <CustomInput
            editable={false}
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

          <View style={{ marginBottom: 20, width: "100%" }}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text style={globalStyles.label}>Date of birth</Text>
            <TouchableOpacity style={[styles.inputContainer, { height: 60 }]} onPress={showDatePicker}>
              <Icon name="calendar-today" size={22} color="#888" style={{ marginRight: 10 }} />
              <View style={globalStyles.inputTextt}>
                <Text>{removeFormatDate(date)}</Text>
              </View>
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
          <View style={{ marginTop: 20 }}>
            <CustomButton onPress={validate} valid={valid} title="Finish" />
          </View>
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

const styles = StyleSheet.create({
  inputContainer: {
    height: 55,
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ced4ed",
    alignItems: "center",
    borderRadius: 8,
  },
});
export default CompleteRegister;
