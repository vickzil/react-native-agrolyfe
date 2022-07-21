import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCreatePinModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors";
import ScreenLoading from "../../../loader/ScreenLoading";
import AddPinForm from "./AddPinForm";
import { globalStyles } from "../../../../styles/global";

const { width } = Dimensions.get("screen");

const AddPinModal = () => {
  const modal = useSelector((state) => state.alert.createPinModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    dispatch(setCreatePinModal(false));
  };

  return (
    <Modal visible={modal} animationType="slide">
      <ScreenLoading visibility={{ status: isLoading, message: "Please wait ..." }} />

      <View style={{ flex: 1, backgroundColor: theme === "dark" ? colors.darkBody : "#f8f8f8" }}>
        <View style={[styles.modalHeader, { backgroundColor: theme === "dark" ? colors.darkCard : "#fff" }]}>
          <Text></Text>
          <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}>Create pin</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            <AddPinForm theme={theme} isLoading={isLoading} setIsLoading={setIsLoading} closeModal={closeModal} />
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
    color: "#222",
    // marginLeft: -45,
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 100,
  },
});
export default AddPinModal;
