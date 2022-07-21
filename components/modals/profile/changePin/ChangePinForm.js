// import "../../../../ignoreWarnings";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { KeycodeInput } from "react-native-keycode";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";
import CustomLoadingButton from "../../../customs/CustomLoadingButton";
import { setAlertModal } from "../../../../store/alert/alertSlice";
import { getUserInfo } from "../../../../store/auth/actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const ChangePinForm = ({ isLoading, setIsLoading, closeModal, theme }) => {
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const dispatch = useDispatch();

  const [oldPin, setOldPin] = useState(null);
  const [newPin, setNewPin] = useState(null);
  const [emptyFields, setEmptyFields] = useState(true);

  const resetAndClose = () => {
    setOldPin(null);
    setNewPin(null);
    setEmptyFields(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!oldPin) {
      setEmptyFields(true);

      return;
    }
    if (oldPin && oldPin.length < 4) {
      setEmptyFields(true);

      return;
    }

    if (!newPin) {
      setEmptyFields(true);

      return;
    }
    if (newPin && newPin.length < 4) {
      setEmptyFields(true);

      return;
    }

    setEmptyFields(false);

    // if (oldPin && newPin ) {
    //   setEmptyFields(false);
    // } else {
    //   setEmptyFields(true);
    // }
  }, [oldPin, newPin]);

  const changePIn = () => {
    if (emptyFields === true) {
      return;
    }

    setEmptyFields(true);
    setIsLoading(true);

    axios
      .post(
        `${baseURL}/v1.0/OAuth/changePin`,
        {
          AppId: AppId,
          RequestId: RequestId,
          Email: user?.email,
          OldPIN: oldPin,
          NewPIN: newPin,
          ConfirmNewPIN: newPin,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
          },
        },
      )
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          setIsLoading(false);
          setEmptyFields(false);

          dispatch(
            setAlertModal({
              status: true,
              type: "SUCCESS",
              title: "Pin change successful",
              des: response.data.message,
              payload: null,
            }),
          );
          resetAndClose();

          dispatch(getUserInfo(user?.code));
        } else {
          setIsLoading(false);
          setOldPin(null);
          setNewPin(null);

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
        setIsLoading(false);

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

  return (
    <View style={styles.form}>
      <View style={{ marginBottom: 25, width: "100%", alignItems: "center" }}>
        <Text style={[styles.label, { textAlign: "center" }, theme === "dark" && globalStyles.textLight]}>Old Pin</Text>
        <KeycodeInput
          style={{ fontFamily: "Poppins", letterSpacing: -0.35644 }}
          alphaNumeric={false}
          autoFocus={true}
          numeric={true}
          tintColor={colors.greenColor}
          textColor={theme === "dark" ? "white" : "black"}
          keyboardType="numeric"
          onChange={(value) => {
            setOldPin(value);
          }}
          onComplete={(value) => {
            setOldPin(value);
          }}
        />
      </View>
      <View style={{ marginTop: 25, width: "100%", alignItems: "center" }}>
        <Text style={[styles.label, { textAlign: "center" }, theme === "dark" && globalStyles.textLight]}>New Pin</Text>
        <KeycodeInput
          style={[{ fontFamily: "Poppins", letterSpacing: -0.35644, color: theme === "dark" ? "#fff" : "444" }]}
          alphaNumeric={false}
          autoFocus={false}
          numeric={true}
          textColor={theme === "dark" ? "white" : "black"}
          tintColor={colors.greenColor}
          keyboardType="numeric"
          onChange={(value) => {
            setNewPin(value);
          }}
          onComplete={(value) => {
            setNewPin(value);
          }}
        />
      </View>

      <View style={{ marginTop: 70, width: "100%" }}>
        <CustomLoadingButton
          onPress={() => changePIn()}
          emptyFields={emptyFields}
          buttonText={"Submit"}
          loading={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "90%",
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
    textTransform: "uppercase",
    fontWeight: "800",
  },

  inputWrapper: {
    justifyContent: "center",
  },

  inputContainer: {
    width: 62,
    height: 55,
    backgroundColor: "#fff",
    color: "#222",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.greenColor,
    alignItems: "center",
    borderRadius: 8,
    fontSize: 25,
  },
});

export default ChangePinForm;
