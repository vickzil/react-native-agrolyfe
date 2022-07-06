import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTransactionDetailsModal } from "../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TransactionModalItem from "./TransactionModalItem";

const { width } = Dimensions.get("screen");

const TransactionDetailsModal = () => {
  const modal = useSelector((state) => state.alert.transactionDetailsModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setTransactionDetailsModal({
        status: false,
        payload: null,
      }),
    );
  };

  return (
    <Modal
      visible={modal?.status}
      animationType="slide"
      onRequestClose={() => {
        dispatch(
          setTransactionDetailsModal({
            status: false,
            payload: null,
          }),
        );
      }}
    >
      <View>
        <View style={[styles.modalHeader, { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#222" }]}
            onPress={() =>
              dispatch(
                setTransactionDetailsModal({
                  status: false,
                  payload: null,
                }),
              )
            }
          />
          <Text style={styles.modalHeaderText}>Transaction</Text>
          <Text></Text>
        </View>

        <TransactionModalItem />

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
    fontFamily: "Montserrat",
    color: "#222",
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
export default TransactionDetailsModal;
