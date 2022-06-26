import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";
import { useDispatch } from "react-redux";
import { setFundwalletModal, setPayBillsModal, setTransferModal } from "../../store/alert/alertSlice";
import { useRef } from "react";
import TransferModalButtom from "../modals/transfer/TransferModalButtom";
import PayBillsModalButtom from "../modals/billspayment/PayBillsModalButtom";

const WalletButtons = () => {
  const dispatch = useDispatch();
  const transferModal = useRef();
  const paybillsModal = useRef();

  return (
    <>
      <TransferModalButtom bottomSheet={transferModal} />
      <PayBillsModalButtom bottomSheet={paybillsModal} />
      <View style={{ width: "100%", marginTop: 20, marginBottom: 50 }}>
        <View style={styles.quickMenus}>
          <View style={{ padding: 5, width: "33%" }}>
            <TouchableOpacity style={styles.quickMenusItem} onPress={() => dispatch(setFundwalletModal(true))}>
              <AntIcon name="wallet" size={26} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
              <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Top up</Text>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 5, width: "33%" }}>
            <TouchableOpacity style={styles.quickMenusItem} onPress={() => transferModal.current.show()}>
              <Icon name="send" size={26} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
              <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Transfer</Text>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 5, width: "33%" }}>
            <TouchableOpacity style={styles.quickMenusItem} onPress={() => paybillsModal.current.show()}>
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
    fontWeight: "500",
    fontFamily: "Poppins",
  },
});

export default WalletButtons;
