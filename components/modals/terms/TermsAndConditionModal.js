import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { setAlertModal, setLoading, setTermsAndCModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import { setAgreeTerms } from "../../../store/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../../../styles/global";

const { width, height } = Dimensions.get("screen");

const TermsAndConditionModal = () => {
  const modal = useSelector((state) => state.alert.termsAndCModal);
  const theme = useSelector((state) => state.oauth.theme);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setTermsAndCModal(false));
  };

  const agreeTermsAndConditions = () => {
    dispatch(
      setLoading({
        status: true,
        message: "please wait...",
      }),
    );

    setTimeout(() => {
      dispatch(setAgreeTerms(true));
      AsyncStorage.setItem("agreeTerms", JSON.stringify(true));
      dispatch(
        setLoading({
          status: false,
          message: "",
        }),
      );

      dispatch(
        setAlertModal({
          status: true,
          type: "SUCCESS",
          title: "Terms & Condition",
          des: "Terms and conditions acceptted",
          payload: null,
        }),
      );

      closeModal();
    }, 1200);
  };

  return (
    <Modal
      isVisible={modal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={100}
      onBackButtonPress={() => closeModal()}
      onBackdropPress={() => closeModal()}
      onSwipeComplete={() => closeModal()}
      // swipeDirection="right"
      style={{
        width: width,
        height: height,
        margin: 0,
        padding: 0,
        backgroundColor: theme === "dark" ? colors.darkBody : "#fff",
      }}
    >
      {/* <StatusBar barStyle="light-content" /> */}
      <View style={{ flex: 1 }}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          {/* <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => closeModal()}
          /> */}
          <Text></Text>
          <Text style={styles.modalHeaderText}>Terms and Conditions</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                paddingHorizontal: 10,
                // width: "98%",
                // justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  backgroundColor: colors.greenColor,
                  marginRight: 10,
                  // marginLeft: 20,
                  textAlign: "left",
                }}
              ></Text>
              <Text style={[styles.userCardText, theme === "dark" && globalStyles.textLight]}>
                That I must abide by all rules and regulations guiding the farmland sales
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                paddingHorizontal: 10,
                // width: "98%",
                // justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  backgroundColor: colors.greenColor,
                  marginRight: 10,
                  // marginLeft: 20,
                  textAlign: "left",
                }}
              ></Text>
              <Text style={[styles.userCardText, theme === "dark" && globalStyles.textLight]}>
                That an agency fee and legal fee apply on the rental income
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                paddingHorizontal: 10,
                // width: "98%",
                // justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  backgroundColor: colors.greenColor,
                  marginRight: 10,
                  // marginLeft: 20,
                  textAlign: "left",
                }}
              ></Text>
              <Text style={[styles.userCardText, theme === "dark" && globalStyles.textLight]}>
                That the attendant fees on rental payment must be paid
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                paddingHorizontal: 10,
                // width: "98%",
                // justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  backgroundColor: colors.greenColor,
                  marginRight: 10,
                  // marginLeft: 20,
                  textAlign: "left",
                }}
              ></Text>
              <Text style={[styles.userCardText, theme === "dark" && globalStyles.textLight]}>
                That the farmland sales have a zero-termination policy
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                paddingHorizontal: 10,
                // width: "98%",
                // justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  backgroundColor: colors.greenColor,
                  marginRight: 10,
                  // marginLeft: 20,
                  textAlign: "left",
                }}
              ></Text>
              <Text style={[styles.userCardText, theme === "dark" && globalStyles.textLight]}>
                That the farmland sales subsist for the stipulated period with the deed of agreement
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                paddingHorizontal: 10,
                // width: "98%",
                // justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  backgroundColor: colors.greenColor,
                  marginRight: 10,
                  // marginLeft: 20,
                  textAlign: "left",
                }}
              ></Text>
              <Text style={[styles.userCardText, theme === "dark" && globalStyles.textLight]}>
                That the client is to obtain rental income every 3 months (90 days).
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            marginTop: 20,
            position: "absolute",
            bottom: 0,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={[styles.productButton, { backgroundColor: "#fff", elevation: 2 }]}
            activeOpacity={0.7}
            onPress={() => closeModal()}
          >
            <Text style={[styles.buttonText, { color: "#222" }]}>Close</Text>
          </TouchableOpacity>
          <View style={{ width: 20 }} />
          <TouchableOpacity
            style={[styles.productButton, { backgroundColor: colors.greenDarkColor, paddingHorizontal: 70 }]}
            activeOpacity={0.7}
            onPress={() => agreeTermsAndConditions()}
          >
            <Text style={styles.buttonText}>I Agree</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    // </GestureRecognizer>
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
    fontWeight: "600",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "PoppinsBold",
    color: "#fff",
    // marginLeft: -45,
  },

  productContainer: {
    // width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: 30,
    paddingBottom: 100,
    paddingHorizontal: 12,
  },

  userCardText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    // letterSpacing: -0.35644,
    fontFamily: "Poppins",
    // paddingLeft: 10,
  },

  productButton: {
    // width: "80%",
    textAlign: "center",
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: "#dee2e6",
    elevation: 0.5,
  },

  buttonText: {
    width: "100%",
    fontSize: 15.5,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Poppins",
  },
});
export default TermsAndConditionModal;
