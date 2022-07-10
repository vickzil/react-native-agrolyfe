import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBvnModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BvnForm from "./BvnForm";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const banner = require("../../../../assets/img/agric.jpg");

const BvnModal = () => {
  const modal = useSelector((state) => state.alert.bvnModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setBvnModal(false));
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeModal()}>
      <View style={{ flex: 1 }}>
        <View
          style={[
            {
              height: "35%",
              position: "relative",
            },
          ]}
        >
          {/* <View style={[styles.modalHeader]}>
            <Icon
              name="window-close"
              size={33}
              style={[styles.modalHeaderIcon, { color: "#fff" }]}
              onPress={() => closeModal()}
            />
            <Text style={styles.modalHeaderText}></Text>
            <Text></Text>
          </View> */}

          <Image
            source={banner}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              zIndex: 9,
            }}
          ></Image>
          <LinearGradient
            colors={["rgba(0,0,0,0.45)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.75)"]}
            style={{
              flex: 1,
              position: "absolute",
              width,
              height: "100%",
              zIndex: 10,
            }}
          />

          <View
            style={{
              flex: 1,
              position: "absolute",
              top: 100,
              width,
              paddingHorizontal: 30,
              zIndex: 20,
            }}
          >
            <Text
              style={{ color: "#fff", fontWeight: "600", fontSize: 24, textAlign: "center", fontFamily: "PoppinsBold" }}
            >
              We need you to add your BVN to further secure your account.
            </Text>
          </View>
        </View>

        <View style={[styles.productContainer]}>
          <BvnForm />
        </View>
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    position: "absolute",
    top: 0,
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,
    zIndex: 12,
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

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 100,
  },
});
export default BvnModal;
