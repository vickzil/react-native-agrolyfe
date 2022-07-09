import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToastModal } from "../../store/alert/alertSlice";

const ToastModal = () => {
  const dispatch = useDispatch();
  const toastModal = useSelector((state) => state.alert.toastModal);

  const closePopUp = () => {
    dispatch(
      setToastModal({
        status: false,
        message: "",
      }),
    );
  };

  return (
    <Modal transparent visible={toastModal?.status} animationType="slide">
      <View style={[styles.defaultStyle]}>
        <TouchableOpacity
          style={[styles.containerStyle, styles.shadowStyle]}
          activeOpacity={0.7}
          onPress={() => closePopUp()}
        >
          <Text style={styles.textStyle}>{toastModal?.message}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

let styles = StyleSheet.create({
  defaultStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    padding: 10,
    backgroundColor: "#000",
    opacity: 0.8,
    borderRadius: 5,
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  textStyle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default ToastModal;
