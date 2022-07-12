import { Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlertModalSuccess, setFeedbackPromptModal } from "../../store/alert/alertSlice";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import colors from "../../styles/colors";
import { globalStyles } from "../../styles/global";
import { addComma } from "../helpers/globalFunction";

const { width } = Dimensions.get("screen");

const AlertSuccessModal = () => {
  const modal = useSelector((state) => state.alert.alertModalSuccess);
  const hasFeedBack = useSelector((state) => state.oauth.hasFeedBack);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setAlertModalSuccess({
        status: false,
        payload: null,
      }),
    );

    if (!hasFeedBack) {
      dispatch(setFeedbackPromptModal(true));
    }
  };

  return (
    <Modal visible={modal?.status} animationType="slide" onRequestClose={() => closeModal()}>
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}></View>
        <View style={styles.bodyContainer}>
          <View style={styles.userCard}>
            <AntDesignIcon name="checksquare" size={20} style={[styles.Icon]} />

            {/* <View style={{ marginTop: 30 }}> */}
            <Text style={[globalStyles.label, styles.amountInput]}>
              NGN {modal?.payload ? addComma(modal?.payload?.amount) : 0}
            </Text>
            <Text style={[globalStyles.label, { color: "#f7ab07", textAlign: "center" }]}>PROCESSING</Text>
            <View style={{ alignItems: "center", textAlign: "center", justifyContent: "center", marginTop: -4 }}>
              <View style={styles.bottomBorder}></View>
            </View>
            <Text style={[globalStyles.label, styles.userCardText, { color: "#222", textAlign: "center" }]}>
              {modal?.payload?.message}
            </Text>

            <TouchableOpacity
              activeOpacity={0.5}
              style={[globalStyles.button, { marginTop: 90, borderRadius: 6, zIndex: 6, width: "85%" }]}
              onPress={() => closeModal()}
            >
              <Text style={globalStyles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,
    // height: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,
    paddingBottom: 300,

    // elevation: 3,
  },

  bodyContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    // paddingTop: 30,
    // paddingBottom: 100,
  },

  userCard: {
    position: "relative",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 25,
    paddingHorizontal: 6,
    paddingBottom: 70,
    // elevation: 1,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginTop: -100,
    zIndex: 20,
  },

  userCardText: {
    fontSize: 17.8,
    fontWeight: "600",
    fontFamily: "Montserrat",
    marginTop: 40,
  },

  Icon: {
    fontSize: 38,
    backgroundColor: "#3d665d",
    padding: 25,
    borderRadius: 100,
    color: "#fff",
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: -40,
  },

  amountInput: {
    fontSize: 30,
    color: "#79b2a6",
    fontWeight: "700",
    textAlign: "center",
    marginTop: 30,
  },

  statuss: {
    textTransform: "uppercase",
    color: "#666",
  },

  bottomBorder: {
    width: 50,
    height: 3,
    backgroundColor: "#f7ab07",
  },
});
export default AlertSuccessModal;
