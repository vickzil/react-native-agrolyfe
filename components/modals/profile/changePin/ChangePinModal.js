import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChangePinModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors";
import ChangePinForm from "./ChangePinForm";
import ScreenLoading from "../../../loader/ScreenLoading";
import SvgComponent from "../../../customs/SvgComponent";

const { width } = Dimensions.get("screen");

const ChangePinModal = () => {
  const modal = useSelector((state) => state.alert.changePinModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    dispatch(setChangePinModal(false));
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeModal()}>
      <ScreenLoading visibility={{ status: isLoading, message: "Please wait ..." }} />
      <SvgComponent />
      <View style={{ flex: 1, backgroundColor: theme === "dark" ? colors.darkBody : "#f8f8f8" }}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>Change pin</Text>
          <Text></Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            <ChangePinForm isLoading={isLoading} theme={theme} setIsLoading={setIsLoading} closeModal={closeModal} />
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
export default ChangePinModal;
