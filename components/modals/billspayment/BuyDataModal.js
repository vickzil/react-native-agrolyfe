import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import { setDataSubscriptionModal } from "../../../store/alert/alertSlice";

import BuyDataForm from "./BuyDataForm";

const { width } = Dimensions.get("screen");

const BuyDataModal = () => {
  const modal = useSelector((state) => state.alert.dataSubscriptionModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setDataSubscriptionModal(false));
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeModal()}>
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <View style={{ backgroundColor: colors.greenDarkColor }}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="arrow-left"
              size={29}
              style={[styles.modalHeaderIcon, { color: "#fff" }]}
              onPress={() => closeModal()}
            />
            <Text style={styles.modalHeaderText}>Data subscription</Text>
            <Text></Text>
          </View>

          <View style={[styles.modalSearchContainer]}>
            <Text style={styles.modalHeaderTex}>NGN 0.00</Text>
            <Text style={[styles.modalHeaderTex, styles.modalHeaderText2]}>Main Balance</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <BuyDataForm closeModal={closeModal} />
          {/* <View style={[styles.productContainer]}>
            <AllSavings />
          </View> */}
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
    paddingVertical: 7,
    paddingHorizontal: 10,
    // elevation: 3,
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
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 27,
    // lineHeight: 29,
    // marginTop: 10,
    fontFamily: "Poppins",
    color: "#fff",
  },

  modalHeaderText2: {
    fontSize: 16,
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 100,
  },
});
export default BuyDataModal;
