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
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import colors from "../../../styles/colors";
import { globalStyles } from "../../../styles/global";

const { width } = Dimensions.get("screen");

const TransactionDetailsModal = () => {
  const modal = useSelector((state) => state.alert.transactionDetailsModal);
  const theme = useSelector((state) => state.oauth.theme);
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
    <Modal visible={modal?.status} animationType="slide" onRequestClose={() => closeModal()}>
      <View
        style={[
          { flex: 1, marginTop: -40 },
          theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
        ]}
      >
        {theme === "dark" ? (
          <FocusAwareStatusBar backgroundColor={colors.darkCard} barStyle="light-content" />
        ) : (
          <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
        )}

        <View style={[styles.modalHeader, { backgroundColor: theme === "dark" ? colors.darkCard : "#fff" }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: theme === "dark" ? "#fff" : "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}>Transaction</Text>
          <Text></Text>
        </View>

        <TransactionModalItem item={modal?.payload} theme={theme} />

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
