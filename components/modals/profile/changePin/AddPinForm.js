// import "../../../../ignoreWarnings";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { KeycodeInput } from "react-native-keycode";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";
import CustomLoadingButton from "../../../customs/CustomLoadingButton";
import { setAlertModal, setBvnModal } from "../../../../store/alert/alertSlice";
import { getUserInfo } from "../../../../store/auth/actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const AddPinForm = ({ isLoading, setIsLoading, closeModal }) => {
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const dispatch = useDispatch();

  const [newPin, setNewPin] = useState(null);
  const [emptyFields, setEmptyFields] = useState(true);

  const resetAndClose = () => {
    setNewPin(null);
    setEmptyFields(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!newPin) {
      setEmptyFields(true);

      return;
    }
    if (newPin && newPin.length < 4) {
      setEmptyFields(true);

      return;
    }

    setEmptyFields(false);
  }, [newPin]);

  const changePIn = () => {
    if (emptyFields === true) {
      return;
    }

    setEmptyFields(true);
    setIsLoading(true);

    axios
      .post(
        `${baseURL}/v1.0/UserOnboard/addUserTransactionPIN`,
        {
          AppId: AppId,
          RequestId: RequestId,
          Email: user?.email,
          PIN: newPin,
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
              title: "Pin creation successful",
              des: response.data.message,
              payload: null,
            }),
          );
          resetAndClose();

          dispatch(getUserInfo(user?.code));

          setTimeout(() => {
            if (!user?.bvnVerifiedOn) {
              dispatch(setBvnModal(true));
            }

            dispatch(
              setAlertModal({
                status: false,
                type: "",
                title: "",
                des: "",
                payload: null,
              }),
            );
          }, 4000);
        } else {
          setIsLoading(false);
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
      <View style={{ marginTop: 25, width: "100%", alignItems: "center" }}>
        <Text style={[styles.productCardContentItemLeft, { fontSize: 25, fontWeight: "900", marginBottom: 4 }]}>
          Create Transaction Pin
        </Text>
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <Text style={[globalStyles.label, { fontSize: 15, textAlign: "center" }]}>Enter 4-digit PIN</Text>
        </View>
        <KeycodeInput
          style={[{ fontFamily: "Poppins", letterSpacing: -0.35644 }]}
          alphaNumeric={false}
          autoFocus={false}
          numeric={true}
          tintColor={colors.greenColor}
          keyboardType="numeric"
          onChange={(value) => {
            setNewPin(value);
          }}
          onComplete={(value) => {
            setNewPin(value);
            Keyboard.dismiss();
          }}
        />
      </View>

      <View style={{ marginTop: 90, width: "100%" }}>
        <CustomLoadingButton
          onPress={() => changePIn()}
          emptyFields={emptyFields}
          buttonText={"Create"}
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

  productCardContentItemLeft: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});

export default AddPinForm;
