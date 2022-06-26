import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPayBillsModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";

const { width } = Dimensions.get("screen");

const airtimeImage = require("../../../assets/img/airtime.jpg");
const dataImage = require("../../../assets/img/data.jpg");
const cableImage = require("../../../assets/img/cable.jpg");

const PayBillsModal = () => {
  const modal = useSelector((state) => state.alert.payBillsModal);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={() => {
        dispatch(setPayBillsModal(false));
      }}
      transparent={true}
    >
      <TouchableOpacity
        onPress={() => dispatch(setPayBillsModal(false))}
        style={{
          // flex: 1,
          backgroundColor: "rgba(58, 56, 56, 0.742)",
          height: "100%",
          // position: "absolute",
        }}
      ></TouchableOpacity>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "55%",
          marginTop: "auto",
          width,
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          // zIndex: 200,
        }}
      >
        <View style={[styles.modalHeader]}>
          {/* <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#222" }]}
            onPress={() => dispatch(setPayBillsModal(false))}
          /> */}
          <Text></Text>
          <Text style={styles.modalHeaderText}>Pay Bills</Text>
          <Text></Text>
        </View>
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
    paddingVertical: 17,
    paddingHorizontal: 10,
    elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Montserrat",
    color: "#222",
    // marginLeft: -35,
  },

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

  imageWidth: {
    width: 120,
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
export default PayBillsModal;
