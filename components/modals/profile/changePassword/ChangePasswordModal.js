import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChangePasswordModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors";
import ChangePasswordForm from "./ChangePasswordForm";

const { width } = Dimensions.get("screen");

const ChangePasswordModal = () => {
  const modal = useSelector((state) => state.alert.changePasswordModal);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={() => {
        dispatch(setChangePasswordModal(false));
      }}
    >
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => dispatch(setChangePasswordModal(false))}
          />
          <Text style={styles.modalHeaderText}>Change password</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            <ChangePasswordForm />
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
    fontWeight: "700",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Montserrat",
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
