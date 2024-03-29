import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNextOfKinModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors";
import NextOfKinForm from "./NextOfKinForm";
import SvgComponent from "../../../customs/SvgComponent";

const { width } = Dimensions.get("screen");

const NextOfKinModal = () => {
  const modal = useSelector((state) => state.alert.nextOfKinModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    if (isLoading) {
      return;
    }
    dispatch(setNextOfKinModal(false));
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeModal()}>
      <View style={{ flex: 1, backgroundColor: theme === "dark" ? colors.darkBody : "#f8f8f8" }}>
        <SvgComponent />
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>Next of kin</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            <NextOfKinForm theme={theme} isLoading={isLoading} setIsLoading={setIsLoading} />
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

  modalSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingVertical: 0,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 30,
  },

  modalHeaderTex: {
    fontWeight: "700",
    fontSize: 27,
    lineHeight: 29,
    marginTop: 10,
    fontFamily: "Montserrat",
    color: "#fff",
  },

  modalHeaderText2: {
    fontSize: 15,
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 100,
  },

  modalSearch: {
    width: "98%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  searchIcon: {
    marginRight: 15,
  },

  searchInput: {
    fontSize: 16,
    color: "#444",
    width: "72%",
    textAlign: "left",
  },

  buttonCopy: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonCopyText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default NextOfKinModal;
