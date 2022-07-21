import { Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlertModal } from "../../store/alert/alertSlice";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import colors from "../../styles/colors";
import { globalStyles } from "../../styles/global";

const { width } = Dimensions.get("screen");

const AlertModal = () => {
  const modal = useSelector((state) => state.alert.alertModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setAlertModal({
        status: false,
        type: "",
        title: "",
        des: "",
        payload: null,
      }),
    );
  };

  return (
    <Modal transparent visible={modal?.status} animationType="fade" onRequestClose={() => closeModal()}>
      <View style={[styles.modalBackground, { flex: 1 }]}>
        <View style={[styles.modalContainer, theme === "dark" && globalStyles.cardDark]}>
          <View style={{ alignItems: "center" }}>
            {/* <View style={styles.header}>
              <AntDesignIcon name="close" size={20} />
            </View> */}
            {modal?.type === "SUCCESS" ? (
              <AntDesignIcon
                name="checkcircle"
                size={90}
                style={[styles.Icon, { marginTop: 30 }, theme === "dark" && { borderWidth: 0 }]}
              />
            ) : (
              <AntDesignIcon
                name="closecircle"
                size={90}
                style={[styles.Icon, { marginTop: 30, color: "red" }, theme === "dark" && { borderWidth: 0 }]}
              />
            )}

            <Text
              style={[
                {
                  marginVertical: 10,
                  fontSize: 19,
                  textAlign: "center",
                  marginLeft: -10,
                  fontFamily: "PoppinsBold",
                  fontWeight: "600",
                },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              {modal?.title}
            </Text>
            <Text
              style={[
                { marginVertical: 20, fontSize: 15, textAlign: "center", fontFamily: "Poppins" },
                theme === "dark" && globalStyles.textLightLight,
              ]}
            >
              {modal?.des}
            </Text>

            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                globalStyles.button,
                { marginTop: 20, borderRadius: 6, zIndex: 6, width: "85%", backgroundColor: "#3d665d" },
              ]}
              onPress={() => closeModal()}
            >
              <Text style={globalStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    width,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "87%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 10,
  },

  header: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  Icon: {
    color: colors.greenColor,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
  },
});
export default AlertModal;
