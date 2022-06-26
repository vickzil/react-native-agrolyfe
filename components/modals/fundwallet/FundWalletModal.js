import {
  Dimensions,
  FlatList,
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
import { setFundwalletModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";

const { width } = Dimensions.get("screen");

const FundWalletModal = () => {
  const modal = useSelector((state) => state.alert.fundwalletModal);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={() => {
        dispatch(setFundwalletModal(false));
      }}
    >
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={{ marginTop: -40, width }}>
        <View style={[styles.modalHeader, { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#222" }]}
            onPress={() => dispatch(setFundwalletModal(false))}
          />
          <Text style={styles.modalHeaderText}>Select funding options </Text>
          <Text></Text>
        </View>
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
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Montserrat",
    color: "#222",
    marginLeft: -5,
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
export default FundWalletModal;
