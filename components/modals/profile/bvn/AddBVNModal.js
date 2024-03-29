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

import AddBvnForm from "./AddBvnForm";
import FocusAwareStatusBar from "../../../customs/statusbar/FocusAwareStatusBar";
import { setAddbvnModal, setSelectedAllBank } from "../../../../store/alert/alertSlice";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";

const { width } = Dimensions.get("screen");

const AddBVNModal = () => {
  const modal = useSelector((state) => state.alert.addbvnModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();

  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberOld, setAccountNumberOld] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [bvn, setBvn] = useState("");
  const [accountName, setAccountName] = useState(null);
  const [accountNameError, setAccountNameError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    if (isLoading) {
      return;
    }
    dispatch(setAddbvnModal(false));
    dispatch(setSelectedAllBank(null));
    // setDefaultBank(null);
    resetAndClose();
  };

  const resetAndClose = () => {
    setBvn("");
    setAccountNumber("");
    setAccountNumberOld("");
    setAccountName(null);
    setAccountNameError("");
    setEmptyFields(true);
    setIsLoading(false);
  };

  return (
    <Modal visible={modal} animationType="fade" onRequestClose={() => closeModal()}>
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkCard} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <View style={[{ flex: 1, marginTop: -40 }, theme === "dark" && globalStyles.containerDark]}>
        <View style={[styles.modalHeader, theme === "dark" ? globalStyles.cardDark : { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, theme === "dark" ? globalStyles.textLight : { color: "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}>Add Bvn</Text>
          <Text></Text>
        </View>
        <AddBvnForm
          closeModal={closeModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          accountNumberOld={accountNumberOld}
          setAccountNumberOld={setAccountNumberOld}
          emptyFields={emptyFields}
          setEmptyFields={setEmptyFields}
          bvn={bvn}
          setBvn={setBvn}
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
    fontSize: 18,
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
export default AddBVNModal;
