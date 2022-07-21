import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAntiPhizingModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors";
import HeaderImageTop from "../../../extra/HeaderImageTop";
import AntiPhizingForm from "./AntiPhizingForm";
import ScreenLoading from "../../../loader/ScreenLoading";
import SvgComponent2 from "../../../customs/SvgComponent2";

const { width } = Dimensions.get("screen");

const AntiPhizingModal = () => {
  const modal = useSelector((state) => state.alert.antiPhizingModal);
  const theme = useSelector((state) => state.oauth.theme);
  const [phrase, setPhrase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState(true);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setAntiPhizingModal(false));
    setEmptyFields(true);
    setIsLoading(false);
    setPhrase("");
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeModal()}>
      <ScreenLoading visibility={{ status: isLoading, message: "Please wait ..." }} />
      <View style={{ flex: 1, backgroundColor: theme === "dark" ? colors.darkBody : "#f8f8f8" }}>
        <SvgComponent2 />
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>Update Anti-phishing</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[{ backgroundColor: colors.greenDarkColor, paddingTop: 20, paddingBottom: 30 }]}>
            <HeaderImageTop />
          </View>

          <View style={[styles.productContainer]}>
            <AntiPhizingForm
              phrase={phrase}
              setPhrase={setPhrase}
              emptyFields={emptyFields}
              setEmptyFields={setEmptyFields}
              setIsLoading={setIsLoading}
              closeModal={closeModal}
              theme={theme}
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
    fontSize: 18,
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
export default AntiPhizingModal;
