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
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { setAddBankModal, setSelectedAllBank } from "../../../store/alert/alertSlice";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import AddBankForm from "./AddBankForm";
import SvgComponent from "../../customs/SvgComponent";
import colors from "../../../styles/colors";
import { globalStyles } from "../../../styles/global";
const { width } = Dimensions.get("screen");

const AddBankModal = () => {
  const modal = useSelector((state) => state.alert.addBankModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();

  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberOld, setAccountNumberOld] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [accountName, setAccountName] = useState(null);
  const [accountNameError, setAccountNameError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    if (isLoading) {
      return;
    }
    dispatch(setAddBankModal(false));
    dispatch(setSelectedAllBank(null));
    // setDefaultBank(null);
    resetAndClose();
  };

  const resetAndClose = () => {
    setAccountNumber("");
    setAccountNumberOld("");
    setAccountName(null);
    setAccountNameError("");
    setEmptyFields(true);
    setIsLoading(false);
  };

  return (
    <Modal visible={modal} animationType="fade" onRequestClose={() => closeModal()}>
      <SvgComponent />
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkCard} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <View
        style={[
          { flex: 1, marginTop: -40 },
          theme === "dark" ? globalStyles.containerDark : { backgroundColor: "#fff" },
        ]}
      >
        <View style={[styles.modalHeader, { backgroundColor: theme === "dark" ? colors.darkCard : "#fff" }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: theme === "dark" ? "#fff" : "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}>Add Bank Accounts</Text>
          <Text></Text>
        </View>
        <AddBankForm
          closeModal={closeModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          accountNumberOld={accountNumberOld}
          setAccountNumberOld={setAccountNumberOld}
          emptyFields={emptyFields}
          setEmptyFields={setEmptyFields}
          accountName={accountName}
          setAccountName={setAccountName}
          accountNameError={accountNameError}
          setAccountNameError={setAccountNameError}
          theme={theme}
        />
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
export default AddBankModal;
