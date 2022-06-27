import React, { useEffect, useRef } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useSelector } from "react-redux";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const airtimeImage = require("../../../assets/img/airtime.jpg");
const dataImage = require("../../../assets/img/data.jpg");
const cableImage = require("../../../assets/img/cable.jpg");

const PayBillsModalButtom = ({ bottomSheet, height }) => {
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
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={380} sheetBackgroundColor="#FFFFFF">
        <View style={styles.accountTabs}>
          <TouchableOpacity style={styles.accountTabsLinks}>
            <View style={styles.imageWidth}>
              <Image
                source={airtimeImage}
                style={[{ width: "100%", height: 50, borderRadius: 100 }]}
                resizeMode="contain"
              />
            </View>

            <View style={{ width: "100%", marginLeft: 30 }}>
              <Text style={[styles.accountTabsTitle, { color: colors.greenDarkColor }]}>Airtime Subscription</Text>
              <Text style={[styles.accountTabsLinkText]}>Send fund to any bank account</Text>
            </View>
            {/* <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginRight: 30 }]} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.accountTabsLinks, { borderBottomWidth: 0 }]}>
            <View style={styles.imageWidth}>
              <Image
                source={dataImage}
                style={[{ width: "100%", height: 50, borderRadius: 100 }]}
                resizeMode="contain"
              />
            </View>

            <View style={{ width: "100%", marginLeft: 30 }}>
              <Text style={[styles.accountTabsTitle, { color: colors.greenDarkColor }]}>Data Subscription</Text>
              <Text style={[styles.accountTabsLinkText]}>Send funds to an agrolyfe user </Text>
            </View>
            {/* <AntDesignIcon name="right" size={19} style={[styles.accountTabsRightAngel, { marginRight: 30 }]} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.accountTabsLinks, { borderBottomWidth: 0 }]}>
            <View style={styles.imageWidth}>
              <Image
                source={cableImage}
                style={[{ width: "100%", height: 50, borderRadius: 100 }]}
                resizeMode="contain"
              />
            </View>

            <View style={{ width: "100%", marginLeft: 30 }}>
              <Text style={[styles.accountTabsTitle, { color: colors.greenDarkColor }]}>Cable Subscription</Text>
              <Text style={[styles.accountTabsLinkText]}>Send funds to an agrolyfe user </Text>
            </View>
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
    marginTop: 50,
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

  imageWidth: {
    width: 120,
    marginLeft: -20,
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

export default PayBillsModalButtom;
