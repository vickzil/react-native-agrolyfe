import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";
import CustomLoadingButton from "../../../customs/CustomLoadingButton";
import axios from "axios";
import { setAlertModal } from "../../../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../store/auth/actions";

const AntiPhizingForm = ({ phrase, setPhrase, emptyFields, setEmptyFields, setIsLoading, closeModal, theme }) => {
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!phrase) {
      setEmptyFields(true);

      return;
    }
    if (phrase && phrase.length < 5) {
      setEmptyFields(true);

      return;
    }

    setEmptyFields(false);
  }, [phrase]);

  const passwordHandle = (value) => {
    setPhrase(value.replace(/\s/g, ""));
  };

  const submitForm = () => {
    if (emptyFields === true) {
      return;
    }

    setEmptyFields(true);
    setIsLoading(true);

    axios
      .post(
        `${baseURL}/v1.0/OAuth/updateAntiPhishingPhrase`,
        {
          AppId: AppId,
          RequestId: RequestId,
          Email: user?.email,
          UserCode: user?.code,
          Phrase: phrase,
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
              title: "Anti-Phishing Phrase Updated",
              des: response.data.message,
              payload: null,
            }),
          );
          closeModal();

          dispatch(getUserInfo(user?.code));
        } else {
          setIsLoading(false);

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
      <View
        style={{
          marginBottom: 40,
          width: "100%",
          borderWidth: 1,
          borderColor: "#ced4ce",
          paddingVertical: 14,
          paddingHorizontal: 10,
          borderRadius: 4,
        }}
      >
        <Text
          style={[
            styles.label,
            { fontWeight: "600", fontSize: 18, color: colors.greenColor, fontFamily: "PoppinsBold" },
          ]}
        >
          Why Anti-phishing?
        </Text>
        <Text style={[styles.label, { fontSize: 17 }, theme === "dark" && globalStyles.textLight]}>
          This is to prevent you from acting on unauthorized or fake E-mails that might be posing to be Agrovest.
        </Text>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={[styles.label, theme === "dark" && globalStyles.textLight]}>phrase</Text>
        <View style={[styles.inputContainer, theme === "dark" && globalStyles.cardDark]}>
          <TextInput
            value={phrase}
            onChangeText={(text) => passwordHandle(text)}
            autoCorrect={false}
            placeholder="Enter phrase..."
            placeholderTextColor={theme === "dark" ? "#fff" : "444"}
            style={[globalStyles.inputTextt, theme === "dark" && globalStyles.textLight]}
          />
        </View>
      </View>

      <View style={{ marginTop: 20, width: "100%" }}>
        <CustomLoadingButton
          onPress={() => submitForm()}
          emptyFields={emptyFields}
          buttonText={"Update phrase"}
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

export default AntiPhizingForm;
