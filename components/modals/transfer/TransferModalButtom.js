import React, { useEffect, useRef } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {
  setSelectBankModal,
  setTransferToBankModal,
  setTransferToCustomerModal,
} from "../../../store/alert/alertSlice";
import CustomerModalButtom from "./CustomerModalButtom";
import { globalStyles } from "../../../styles/global";

const TransferModalButtom = ({ bottomSheet, closeTransferModal }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.oauth.theme);
  const searchCustomerModal = useRef();
  //   const modal = useSelector((state) => state.alert.transferModal);

  //   useEffect(() => {
  //     if (modal.status === true) {
  //       bottomSheet.current.show();
  //     }
  //     // else {
  //     //   bottomSheet.current.hide();
  //     // }
  //   }, [modal]);

  const closeCustomerModal = () => {
    searchCustomerModal.current.close();
  };

  const transferToCustomer = () => {
    // searchCustomerModal.current.show();
    closeTransferModal();

    dispatch(
      setTransferToCustomerModal({
        status: true,
        user: null,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomerModalButtom bottomSheet={searchCustomerModal} closeModal={closeCustomerModal} /> */}
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={300}
        onRequestClose={() => closeTransferModal()}
        sheetBackgroundColor={theme === "dark" ? colors.darkCard : "#fff"}
      >
        <View style={styles.accountTabs}>
          <TouchableOpacity
            style={styles.accountTabsLinks}
            onPress={() => {
              dispatch(
                setTransferToBankModal({
                  status: true,
                  bank: null,
                }),
              );

              closeTransferModal();
            }}
          >
            <View>
              <Icon
                name="bank-transfer"
                size={45}
                style={[{ paddingRight: 19, color: theme === "dark" ? "#fff" : colors.greenColor, marginLeft: 15 }]}
              />
            </View>

            <View style={{ width: "100%", marginLeft: 30 }}>
              <Text
                style={[
                  styles.accountTabsTitle,
                  { color: colors.greenDarkColor },
                  theme === "dark" && globalStyles.textLight,
                ]}
              >
                Send to bank
              </Text>
              <Text style={[styles.accountTabsLinkText, theme === "dark" && globalStyles.textLightLight]}>
                Send fund to any bank account
              </Text>
            </View>
            <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginRight: 30 }]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.accountTabsLinks, { borderBottomWidth: 0 }]}
            onPress={() => transferToCustomer()}
          >
            <View>
              <FontAwesomeIcon
                name="exchange"
                size={30}
                style={[{ paddingRight: 28, color: theme === "dark" ? "#fff" : colors.greenColor, marginLeft: 15 }]}
              />
            </View>

            <View style={{ width: "100%", marginLeft: 30 }}>
              <Text
                style={[
                  styles.accountTabsTitle,
                  { color: colors.greenDarkColor },
                  theme === "dark" && globalStyles.textLight,
                ]}
              >
                Wallet Share
              </Text>
              <Text style={[styles.accountTabsLinkText, theme === "dark" && globalStyles.textLightLight]}>
                Send funds to an agrolyfe user{" "}
              </Text>
            </View>
            <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginRight: 30 }]} />
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  accountTabs: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 8,
    marginTop: 30,
    paddingBottom: 0,
    // paddingRight: 30,
  },

  accountTabsTitle: {
    fontSize: 16,
    color: "#d3b7b7",
    paddingBottom: 8,
    fontWeight: "bold",

    // paddingVertical: 18,
  },

  accountTabsLinks: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e9e6e6",
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingRight: 10,
    paddingBottom: 22,
  },

  accountTabsFlex: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
  },

  accountTabsLinkText: {
    fontFamily: "Poppins",
    fontSize: 13,
    color: "#666",
  },

  accountTabsRightAngel: {
    color: "#888",
  },
});

export default TransferModalButtom;
