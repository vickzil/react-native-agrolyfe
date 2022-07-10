import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCreatePinModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors";
import ScreenLoading from "../../../loader/ScreenLoading";
import AddPinForm from "./AddPinForm";

const { width } = Dimensions.get("screen");

const AddPinModal = () => {
  const modal = useSelector((state) => state.alert.createPinModal);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    dispatch(setCreatePinModal(false));
  };

  return (
    <Modal visible={modal} animationType="slide">
      <ScreenLoading visibility={{ status: isLoading, message: "Please wait ..." }} />

      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={[styles.modalHeader, { backgroundColor: "#fff" }]}>
          <Text></Text>
          <Text style={styles.modalHeaderText}>Create pin</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            <AddPinForm isLoading={isLoading} setIsLoading={setIsLoading} closeModal={closeModal} />
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
