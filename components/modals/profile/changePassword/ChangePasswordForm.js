import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomLoadingButton from "../../../customs/CustomLoadingButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlertModal } from "../../../../store/alert/alertSlice";
import { getUserInfo } from "../../../../store/auth/actions";

const ChangePasswordForm = ({
  setIsLoading,
  closeModal,
  emptyFields,
  setEmptyFields,
  setHideNewPassword,
  hideNewPassword,
  setHidePassword,
  hidePassword,
  setNewPassword,
  newPassword,
  setPassword,
  password,
  theme,
}) => {
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!password) {
      setEmptyFields(true);

      return;
    }
    if (password && password.length < 5) {
      setEmptyFields(true);

      return;
    }

    if (!newPassword) {
      setEmptyFields(true);

      return;
    }
    if (newPassword && newPassword.length < 4) {
      setEmptyFields(true);

      return;
    }

    setEmptyFields(false);
  }, [password, newPassword]);

  const changePassword = () => {
    if (emptyFields === true) {
      return;
    }

    setEmptyFields(true);
    setIsLoading(true);

    axios
      .post(
        `${baseURL}/v1.0/OAuth/changePassword`,
        {
          AppId: AppId,
          RequestId: RequestId,
          Email: user?.email,
          CurrentPassword: password,
          NewPassword: newPassword,
          ConfirmNewPassword: newPassword,
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
              title: "Password change successful",
              des: response.data.message,
              payload: null,
            }),
          );
          closeModal();

          dispatch(getUserInfo(user?.code));
        } else {
          setIsLoading(false);
          setPassword(null);
          setNewPassword(null);

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
      <View style={{ marginBottom: 25, width: "100%" }}>
        <Text
          style={[styles.label, { marginBottom: 0, fontWeight: "600" }, theme === "dark" && globalStyles.textLight]}
        >
          Old password
        </Text>
        <View style={[styles.inputContainer, theme === "dark" && globalStyles.cardDark]}>
          <TextInput
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            placeholder="Enter old password"
            placeholderTextColor={theme === "dark" ? "#fff" : "#444"}
            style={[globalStyles.inputTextt, { fontSize: 18 }, theme === "dark" && globalStyles.textLight]}
          />
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={{ fontSize: 30, color: theme === "dark" ? "#888" : "#666" }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text
          style={[styles.label, { marginBottom: 0, fontWeight: "600" }, theme === "dark" && globalStyles.textLight]}
        >
          New password
        </Text>
        <View style={[styles.inputContainer, theme === "dark" && globalStyles.cardDark]}>
          <TextInput
            secureTextEntry={hideNewPassword}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            autoCorrect={false}
            placeholder="Enter new password"
            placeholderTextColor={theme === "dark" ? "#fff" : "#444"}
            style={[globalStyles.inputTextt, { fontSize: 18 }, theme === "dark" && globalStyles.textLight]}
          />
          <Icon
            onPress={() => setHideNewPassword(!hideNewPassword)}
            style={{ fontSize: 30, color: theme === "dark" ? "#888" : "#666" }}
            name={hideNewPassword ? "eye-outline" : "eye-off-outline"}
          />
        </View>
      </View>

      <View style={{ marginTop: 20, width: "100%" }}>
        <CustomLoadingButton
          onPress={() => changePassword()}
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
    fontSize: 15,
    color: "#444",
    marginBottom: 10,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  inputContainer: {
    height: 55,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ced4ed",
    alignItems: "center",
    borderRadius: 8,
  },
});

export default ChangePasswordForm;
