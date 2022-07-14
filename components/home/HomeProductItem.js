import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  setFundwalletModal,
  setPayBillsModal,
  setProductDetailsModal,
  setTransferModal,
} from "../../store/alert/alertSlice";
import { useRef } from "react";
import TransferModalButtom from "../modals/transfer/TransferModalButtom";
import PayBillsModalButtom from "../modals/billspayment/PayBillsModalButtom";
import FundWalletModalButtom from "../modals/fundwallet/FundWalletModalButtom";
import { addComma } from "../helpers/globalFunction";

const { width } = Dimensions.get("window");

const HomeProductItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const transferModal = useRef();
  const paybillsModal = useRef();
  const fundWalletModal = useRef();
  const userWalletBalance = useSelector((state) => state.wallet.userWalletBalance);
  const loading = useSelector((state) => state.wallet.loading);

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

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() =>
        dispatch(
          setProductDetailsModal({
            status: true,
            payload: item,
          }),
        )
      }
      style={[styles.card, index === 0 && styles.addMarginLeft]}
    >
      <View style={styles.productImage}>
        <Image
          source={{ uri: item.imageURL }}
          style={{ width: "100%", height: 170, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          resizeMode="cover"
        />
      </View>
      <View style={{ paddingHorizontal: 10, paddingTop: 15, width: "100%" }}>
        <Text style={styles.cardHeading}>{item.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Text style={[styles.paragraph, { color: "rgba(24, 133, 111, 0.54)" }]}>{item?.duration} Months</Text>
            <Text style={[styles.paragraph, { color: "rgba(24, 133, 111, 0.54)" }]}>{item.newInterestRate}%</Text>
          </View>
        </View>
      </View>

      {/* <TouchableOpacity style={{ marginTop: 30 }} onPress={() => handlePress(item)}>
        <View
          style={[
            styles.button,
            {
              color: "#fff",
              // borderColor: colors.greenNormalColor,
              backgroundColor: colors.greenColor,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>{item.buttonText}</Text>
          <Icon name="chevron-right-circle-outline" size={13} style={[styles.cardButtonIcon, { color: "#fff" }]} />
        </View>
      </TouchableOpacity> */}
      {/* <View style={styles.imagedrop}>
        <Image source={imagedrop} style={styles.imagedropImage} />
      </View> */}
    </TouchableOpacity>
  );
};

export default HomeProductItem;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: width * 0.49,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: "#fff",
    borderWidth: 0.7,
    borderColor: "#dee2e6",
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: "left",
  },

  addMarginLeft: {
    marginLeft: 0,
  },

  cardHeading: {
    fontWeight: "500",
    fontSize: 13,
    textAlign: "center",
    letterSpacing: -0.35644,
    color: "rgba(24, 133, 111, 0.54)",
    marginBottom: 0,
    textAlign: "left",
    fontFamily: "PoppinsBold",
  },

  paragraph: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 30,
    textAlign: "left",
    letterSpacing: -0.35644,
    marginBottom: 6,
    textAlign: "left",
  },

  button: {
    width: 150,
    backgroundColor: "#fff",
    // borderWidth: 0.742584,
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
