import React, { useEffect, useRef } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import {
  setFundWalletByCardModal,
  setFundwalletByForeignTransferModal,
  setFundwalletByLocalTransferModal,
  setFundwalletModal,
  setPaymentEvidenceModal,
} from "../../../store/alert/alertSlice";
import { globalStyles } from "../../../styles/global";

const FundWalletModalButtom = ({ bottomSheet, closeModal }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.oauth.theme);
  // const bottomSheet = useRef(null);
  // const modal = useSelector((state) => state.alert.fundwalletModal);

  // useEffect(() => {
  //   if (modal === true) {
  //     bottomSheet.current.show();
  //   } else {
  //     bottomSheet.current.close();
  //   }
  // }, [modal]);

  const showFundWalletModal = () => {
    dispatch(setFundwalletByLocalTransferModal(true));
    // closeModal();
  };

  const showFundWalletTransferModal = () => {
    dispatch(setFundwalletByForeignTransferModal(true));
    // closeModal();
  };

  const showPaymentEvidentModal = () => {
    dispatch(setPaymentEvidenceModal(true));
    closeModal();
  };

  const showFundWalletByCardModal = () => {
    dispatch(
      setFundWalletByCardModal({
        status: true,
        card: null,
      }),
    );
    closeModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        onRequestClose={() => closeModal()}
        height={500}
        sheetBackgroundColor={theme === "dark" ? colors.darkCard : "#fff"}
      >
        <View style={styles.accountTabs}>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => showFundWalletByCardModal()}>
            <View>
              <AntDesignIcon
                name="creditcard"
                size={30}
                style={[{ paddingRight: 19 }, theme === "dark" ? globalStyles.textLight : { color: colors.greenColor }]}
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
                Fund with Card
              </Text>
              <Text style={[styles.accountTabsLinkText, theme === "dark" && globalStyles.textLightLight]}>
                verve, Visa, Mastercard, discover and Amex cards are all accepted
              </Text>
            </View>
            {/* <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginLeft: 30 }]} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => showFundWalletModal()}>
            <View>
              <Icon
                name="bank"
                size={30}
                style={[{ paddingRight: 19 }, theme === "dark" ? globalStyles.textLight : { color: colors.greenColor }]}
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
                Fund with Local Bank Transfer(NGN)
              </Text>
              <Text style={[styles.accountTabsLinkText, theme === "dark" && globalStyles.textLightLight]}>
                Make a transfer directly from your bank account to complete a transaction
              </Text>
            </View>
            {/* <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginLeft: 30 }]} /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.accountTabsLinks}
            onPress={() => dispatch(setFundwalletByForeignTransferModal(true))}
          >
            <View>
              <Icon
                name="bank-transfer"
                size={40}
                style={[{ paddingRight: 19 }, theme === "dark" ? globalStyles.textLight : { color: colors.greenColor }]}
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
                Fund with Foreign Bank Transfer(USD, GBP, EUR)
              </Text>
              <Text style={[styles.accountTabsLinkText, theme === "dark" && globalStyles.textLightLight]}>
                Make a transfer from a foreign bank account to complete a transaction{" "}
              </Text>
            </View>
            {/* <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginLeft: 30 }]} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => showPaymentEvidentModal()}>
            <View>
              <Fontisto
                name="money-symbol"
                size={30}
                style={[{ paddingRight: 19 }, theme === "dark" ? globalStyles.textLight : { color: colors.greenColor }]}
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
                Upload evidence of payment
              </Text>
              <Text style={[styles.accountTabsLinkText, theme === "dark" && globalStyles.textLightLight]}>
                Have you already made payment by transfer, kindly upload payment evidence.{" "}
              </Text>
            </View>
            {/* <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginLeft: 30 }]} /> */}
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
    fontSize: 14,
    color: "#d3b7b7",
    paddingBottom: 2,
    fontWeight: "600",
    fontFamily: "PoppinsBold",
    // letterSpacing: -0.35644,

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

export default FundWalletModalButtom;
