import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../styles/colors";
import { useDispatch } from "react-redux";
import { setFundwalletModal, setPayBillsModal, setTransferModal } from "../../store/alert/alertSlice";
import { useRef } from "react";
import TransferModalButtom from "../modals/transfer/TransferModalButtom";
import PayBillsModalButtom from "../modals/billspayment/PayBillsModalButtom";
import FundWalletModalButtom from "../modals/fundwallet/FundWalletModalButtom";

const { width } = Dimensions.get("screen");
// const imagedrop = require("../../assets/img/imagedrop.png");

const HomeWalletItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const transferModal = useRef();
  const paybillsModal = useRef();
  const fundWalletModal = useRef();

  const handlePress = (data) => {
    if (data.type === "Fund") {
      fundWalletModal.current.show();
    }
    if (data.type === "Paybills") {
      // dispatch(setPayBillsModal(true));
      paybillsModal.current.show();
    }
    if (data.type === "Transfer") {
      // dispatch(setTransferModal(true));
      transferModal.current.show();
    }
  };

  const closeTransferModal = () => {
    transferModal.current.close();
  };

  return (
    <>
      <TransferModalButtom bottomSheet={transferModal} closeTransferModal={closeTransferModal} />
      <PayBillsModalButtom bottomSheet={paybillsModal} />
      <FundWalletModalButtom bottomSheet={fundWalletModal} />
      <View style={[styles.card, index === 0 && styles.addMarginLeft]}>
        <Text style={styles.cardHeading}>{item.heading}</Text>
        <Text style={[styles.paragraph, { color: colors.greenColor }]}>{item.paragraph}</Text>
        <TouchableOpacity style={{ marginTop: 30 }} onPress={() => handlePress(item)}>
          <View style={[styles.button, { color: colors.greenNormalColor, borderColor: colors.greenNormalColor }]}>
            <Text style={[styles.buttonText, { color: colors.greenNormalColor }]}>{item.buttonText}</Text>
            <Icon
              name="chevron-right-circle-outline"
              size={13}
              style={[styles.cardButtonIcon, { color: colors.greenNormalColor }]}
            />
          </View>
        </TouchableOpacity>
        {/* <View style={styles.imagedrop}>
        <Image source={imagedrop} style={styles.imagedropImage} />
      </View> */}
      </View>
    </>
  );
};

export default HomeWalletItem;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: width * 0.79,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: "#fff",
    borderWidth: 0.7,
    borderColor: "#18856f",
    borderStyle: "solid",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
    textAlign: "left",
  },

  addMarginLeft: {
    marginLeft: 15,
  },

  cardHeading: {
    fontWeight: "500",
    fontSize: 17,
    textAlign: "center",
    letterSpacing: -0.35644,
    color: "rgba(24, 133, 111, 0.54)",
    marginBottom: 7,
    textAlign: "left",
  },

  paragraph: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 30,
    textAlign: "center",
    letterSpacing: -0.35644,
    marginBottom: 3,
    textAlign: "left",
  },

  button: {
    width: 150,
    backgroundColor: "#fff",
    borderWidth: 0.742584,
    borderStyle: "solid",
    borderRadius: 4.4555,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  buttonText: {
    fontSize: 14,
  },

  cardButtonIcon: {
    fontSize: 14,
  },

  imagedrop: {
    position: "absolute",
    right: 20,
    top: 2,
    zIndex: 30,
  },

  imagedropImage: {
    width: "100%",
    height: "100%",
  },
});
