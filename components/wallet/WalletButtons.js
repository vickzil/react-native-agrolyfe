import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import colors from "../../styles/colors";
import { useRef } from "react";
import TransferModalButtom from "../modals/transfer/TransferModalButtom";
import PayBillsModalButtom from "../modals/billspayment/PayBillsModalButtom";
import FundWalletModalButtom from "../modals/fundwallet/FundWalletModalButtom";

const WalletButtons = () => {
  const transferModal = useRef();
  const paybillsModal = useRef();
  const fundWalletModal = useRef();

  const closeTransferModal = () => {
    transferModal.current.close();
  };

  const closeFundwalletModal = () => {
    fundWalletModal.current.close();
  };

  const closePaybillsModal = () => {
    paybillsModal.current.close();
  };

  return (
    <>
      <TransferModalButtom bottomSheet={transferModal} closeTransferModal={closeTransferModal} />
      <PayBillsModalButtom bottomSheet={paybillsModal} closeModal={() => closePaybillsModal()} />
      <FundWalletModalButtom bottomSheet={fundWalletModal} closeModal={() => closeFundwalletModal()} />
      <View style={{ width: "100%", marginTop: 20, marginBottom: 50 }}>
        <View style={styles.quickMenus}>
          <View style={{ padding: 5, width: "33%" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.quickMenusItem}
              onPress={() => fundWalletModal.current.show()}
            >
              <AntIcon name="wallet" size={26} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
              <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Top up</Text>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 5, width: "33%" }}>
            <TouchableOpacity
              style={styles.quickMenusItem}
              onPress={() => transferModal.current.show()}
              activeOpacity={0.8}
            >
              <Icon name="send" size={26} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
              <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Transfer</Text>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 5, width: "33%" }}>
            <TouchableOpacity
              style={styles.quickMenusItem}
              activeOpacity={0.8}
              onPress={() => paybillsModal.current.show()}
            >
              <Icon name="account-cash" size={26} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
              <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Pay Bills</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  quickMenus: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  quickMenusItem: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    // margin: 3,
  },

  quickMenusItemIcon: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 7,
    marginBottom: 10,
    fontWeight: "900",
    elevation: 1,
  },

  quickMenusItemText: {
    fontSize: 14,
    fontWeight: "600",
    // fontFamily: "Poppins",
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});

export default WalletButtons;
