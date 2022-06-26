import React, { useEffect, useRef } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useSelector } from "react-redux";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";

const FundWalletModalButtom = ({ bottomSheet }) => {
  //   const modal = useSelector((state) => state.alert.transferModal);

  //   useEffect(() => {
  //     if (modal.status === true) {
  //       bottomSheet.current.show();
  //     }
  //     // else {
  //     //   bottomSheet.current.hide();
  //     // }
  //   }, [modal]);

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={550}>
        <View style={styles.accountTabs}>
          <TouchableOpacity style={styles.accountTabsLinks}>
            <View>
              <AntDesignIcon name="creditcard" size={30} style={[{ paddingRight: 19, color: colors.greenColor }]} />
            </View>

            <View style={{ width: "100%", marginLeft: 30 }}>
              <Text style={[styles.accountTabsTitle, { color: colors.greenDarkColor }]}>Fund with Card</Text>
              <Text style={[styles.accountTabsLinkText]}>
                verve, Visa, Mastercard, discover and Amex cards are all accepted
              </Text>
            </View>
            {/* <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginLeft: 30 }]} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks}>
            <View>
              <Icon name="bank" size={30} style={[{ paddingRight: 19, color: colors.greenColor }]} />
            </View>

            <View style={{ width: "100%", marginLeft: 30 }}>
              <Text style={[styles.accountTabsTitle, { color: colors.greenDarkColor }]}>
                Fund with Local Bank Transfer(NGN)
              </Text>
              <Text style={[styles.accountTabsLinkText]}>
                Make a transfer directly from your bank account to complete a transaction
              </Text>
            </View>
            {/* <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginLeft: 30 }]} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks}>
            <View>
              <Icon name="bank-transfer" size={40} style={[{ paddingRight: 19, color: colors.greenColor }]} />
            </View>

            <View style={{ width: "100%", marginLeft: 30 }}>
              <Text style={[styles.accountTabsTitle, { color: colors.greenDarkColor }]}>
                Fund with Foreign Bank Transfer(USD, GBP, EUR)
              </Text>
              <Text style={[styles.accountTabsLinkText]}>
                Make a transfer from a foreign bank account to complete a transaction{" "}
              </Text>
            </View>
            {/* <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginLeft: 30 }]} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks}>
            <View>
              <Fontisto name="money-symbol" size={30} style={[{ paddingRight: 19, color: colors.greenColor }]} />
            </View>

            <View style={{ width: "100%", marginLeft: 30 }}>
              <Text style={[styles.accountTabsTitle, { color: colors.greenDarkColor }]}>
                Upload evidence of payment
              </Text>
              <Text style={[styles.accountTabsLinkText]}>
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

export default FundWalletModalButtom;
