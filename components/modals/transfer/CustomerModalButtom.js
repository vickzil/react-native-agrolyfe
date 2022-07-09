import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { setAlertModal, setSelectedUser, setTransferToCustomerModal } from "../../../store/alert/alertSlice";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import axios from "axios";
import { removeAtFromString } from "../../helpers/globalFunction";

const { width } = Dimensions.get("screen");

const CustomerModalButtom = ({ bottomSheet, closeModal }) => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [calculatedUser, setCalculatedUser] = useState(null);
  const [buttonText, setButtonText] = useState("Search");
  const [emptyFields, setEmptyFields] = useState(true);
  const [loading, setLoading] = useState(false);

  const userImage = require("../../../assets/img/user-default.png");

  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);
  //   const modal = useSelector((state) => state.alert.transferModal);

  useEffect(() => {}, [bottomSheet]);

  useEffect(() => {
    if (!userName) {
      setEmptyFields(true);

      return;
    }
    setEmptyFields(false);
  }, [userName]);

  const procceed = () => {
    if (calculatedUser) {
      let inputUserName = removeAtFromString(userName).trim();
      if (calculatedUser?.userName !== inputUserName) {
        searchUser();
        return;
      }

      dispatch(setSelectedUser(calculatedUser));
      dispatch(
        setTransferToCustomerModal({
          status: true,
          user: calculatedUser,
        }),
      );
      closeTransferModal();

      return;
    }

    searchUser();
  };

  const searchUser = () => {
    setEmptyFields(true);
    setLoading(true);
    let inputUserName = removeAtFromString(userName).trim();

    let newPayload = {
      AppId: AppId,
      RequestId: RequestId,
      UserName: inputUserName.toLowerCase(),
    };

    axios
      .post(`${baseURL}/v1.0/User/getUserInfoByUserName`, newPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        if (response?.data?.success == true) {
          setEmptyFields(false);
          setCalculatedUser(response?.data?.data);
          setLoading(false);
          setButtonText("Continue");
        } else {
          setButtonText("Search");
          setLoading(false);
          setCalculatedUser(null);
          setEmptyFields(false);

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
        setLoading(false);
        setButtonText("Search");

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

  const closeTransferModal = () => {
    setEmptyFields(true);
    setLoading(false);
    setButtonText("Continue");
    setUserName("");
    setCalculatedUser(null);
    closeModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600} onRequestClose={() => closeTransferModal()} on>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="chevron-left"
              size={33}
              style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]}
              onPress={() => closeTransferModal()}
            />
            <Text style={styles.modalHeaderText}></Text>
            <Text></Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}>
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 100,
                padding: 4,
                backgroundColor: "#fff",
                position: "relative",
              }}
            >
              {calculatedUser ? (
                <Image
                  source={{ uri: calculatedUser?.photo }}
                  style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={userImage}
                  style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
                  resizeMode="cover"
                />
              )}
            </View>

            {calculatedUser ? (
              <>
                <Text style={[styles.accountUserFullName, { fontSize: 20, marginBottom: 0, paddingBottom: 0 }]}>
                  {calculatedUser?.firstName + " " + calculatedUser.lastName}
                </Text>
                <Text style={[styles.accountUserFullName, { marginTop: 0, fontWeight: "900" }]}>
                  @{calculatedUser?.userName}
                </Text>
              </>
            ) : (
              <Text style={styles.accountUserFullName}>*********</Text>
            )}
          </View>

          {!calculatedUser ? (
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}>
              <Text
                style={[globalStyles.label, { fontSize: 15, textAlign: "center", marginBottom: 40, fontWeight: "600" }]}
              >
                Enter customer username
              </Text>
              <View style={[styles.inputContainer]}>
                <Text style={{ fontWeight: "900", fontSize: 20, marginRight: 4 }}>@</Text>
                <TextInput
                  value={userName}
                  autoFocus={true}
                  onChangeText={(text) => setUserName(text)}
                  autoCorrect={false}
                  style={[globalStyles.inputTextt, styles.inputField]}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
            marginBottom: 0,
            position: "absolute",
            bottom: 20,
            width: "100%",
          }}
        >
          <View style={{ width: "90%" }}>
            <CustomLoadingButton
              onPress={() => procceed()}
              emptyFields={emptyFields}
              buttonText={buttonText}
              loading={loading}
            />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,

    // elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
    color: "#111",
    marginLeft: -45,
  },
  headerImageContainer: {
    paddingBottom: 40,
  },

  accountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  accountUserFullName: {
    fontFamily: "Poppins",
    marginTop: 14,
    fontSize: 17,
    color: "#666",
  },

  accountTitle: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#222",
    fontWeight: "700",
  },

  iconImageUpload: {
    position: "absolute",
    bottom: 5,
    right: -5,
    backgroundColor: "#18856F",
    borderRadius: 50,
    padding: 8,
    fontWeight: "700",
  },

  inputContainer: {
    width: "80%",
    height: 55,
    // backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderColor: colors.greenColor,
    alignItems: "center",
    borderRadius: 8,
  },
});

export default CustomerModalButtom;
