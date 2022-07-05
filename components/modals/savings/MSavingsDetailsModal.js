import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMySavingsDetailsModal } from "../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PurchasedSavingsItemModal from "./PurchasedSavingsItemModal";

const { width } = Dimensions.get("screen");

const MSavingsDetailsModal = () => {
  const modal = useSelector((state) => state.alert.mySavingsDetailsModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setMySavingsDetailsModal({
        status: false,
        payload: null,
      }),
    );
  };

  return (
    <Modal visible={modal?.status} animationType="slide" onRequestClose={() => closeModal()}>
      <View>
        <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={[styles.modalHeader, { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}> Savings Details</Text>
          <Text></Text>
        </View>

        <PurchasedSavingsItemModal />

        {/* <Banks /> */}
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
    elevation: 3,
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
    fontFamily: "Poppins",
    color: "#333",
    marginLeft: -45,
  },

  modalSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 30,
  },
});
export default MSavingsDetailsModal;
