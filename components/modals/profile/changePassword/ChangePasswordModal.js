import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChangePasswordModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors";
import ChangePasswordForm from "./ChangePasswordForm";
import ScreenLoading from "../../../loader/ScreenLoading";
import SvgComponent from "../../../customs/SvgComponent";

const { width } = Dimensions.get("screen");

const ChangePasswordModal = () => {
  const modal = useSelector((state) => state.alert.changePasswordModal);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState(true);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);

  const closeModal = () => {
    dispatch(setChangePasswordModal(false));
    setEmptyFields(true);

    setIsLoading(false);
    setPassword(null);
    setNewPassword(null);
    setHidePassword(true);
    setHideNewPassword(true);
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeModal()}>
      <ScreenLoading visibility={{ status: isLoading, message: "Please wait ..." }} />
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <SvgComponent />
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>Change password</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            <ChangePasswordForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              closeModal={closeModal}
              emptyFields={emptyFields}
              setEmptyFields={setEmptyFields}
              password={password}
              setPassword={setPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              hidePassword={hidePassword}
              setHidePassword={setHidePassword}
              hideNewPassword={hideNewPassword}
              setHideNewPassword={setHideNewPassword}
            />
          </View>
        </ScrollView>
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
    marginLeft: -45,
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 100,
  },
});
export default ChangePasswordModal;
