import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feathericons from "react-native-vector-icons/Feather";
import colors from "../../styles/colors";
import { useDispatch } from "react-redux";
import {
  setBankModal,
  setCardModal,
  setChangePinModal,
  setMySavingsModal,
  setReferralModal,
  setTransactionModal,
} from "../../store/alert/alertSlice";
const QuickMenus = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={{ width: "100%", marginTop: 0, marginBottom: 30 }}>
      <Text style={[globalStyles.siteTitle]}>Quick Menus</Text>
      <View style={styles.quickMenus}>
        <View style={{ padding: 5, width: "50%" }}>
          <TouchableOpacity style={styles.quickMenusItem} onPress={() => dispatch(setReferralModal(true))}>
            <AntIcon name="addusergroup" size={25} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
            <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Referral</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 5, width: "50%" }}>
          <TouchableOpacity style={styles.quickMenusItem} onPress={() => dispatch(setMySavingsModal(true))}>
            <Icon name="wallet-outline" size={25} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
            <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Savings</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ padding: 5, width: "50%" }}>
          <TouchableOpacity style={styles.quickMenusItem} onPress={() => navigation.navigate("ProductNavigator")}>
            <AntIcon name="isv" size={25} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
            <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Products</Text>
          </TouchableOpacity>
        </View> */}

        <View style={{ padding: 5, width: "50%" }}>
          <TouchableOpacity style={styles.quickMenusItem} onPress={() => dispatch(setBankModal(true))}>
            <Icon name="bank-outline" size={25} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
            <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Bank</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{ padding: 5, width: "50%" }}>
          <TouchableOpacity style={styles.quickMenusItem} onPress={() => navigation.navigate("Account")}>
            <Icon name="human-child" size={25} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
            <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Account</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{ padding: 5, width: "50%" }}>
          <TouchableOpacity style={styles.quickMenusItem} onPress={() => dispatch(setCardModal(true))}>
            <Icon
              name="credit-card-multiple-outline"
              size={25}
              style={[styles.quickMenusItemIcon, { color: colors.greenColor }]}
            />
            <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Cards</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 5, width: "50%" }}>
          <TouchableOpacity style={styles.quickMenusItem} onPress={() => dispatch(setTransactionModal(true))}>
            <Icon
              name="card-bulleted-outline"
              size={25}
              style={[styles.quickMenusItemIcon, { color: colors.greenColor }]}
            />
            <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Transactions</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 5, width: "50%" }}>
          <TouchableOpacity style={styles.quickMenusItem} onPress={() => dispatch(setChangePinModal(true))}>
            <Feathericons name="key" size={25} style={[styles.quickMenusItemIcon, { color: colors.greenColor }]} />
            <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Change pin</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ padding: 5, width: "50%" }}>
          <TouchableOpacity style={styles.quickMenusItem}>
            <Ionicons
              name="shield-checkmark"
              size={25}
              style={[styles.quickMenusItemIcon, { color: colors.greenColor }]}
            />
            <Text style={[styles.quickMenusItemText, { color: colors.greenColor }]}>Support</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default QuickMenus;

const styles = StyleSheet.create({
  quickMenus: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  quickMenusItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 19,
    // paddingHorizontal: 25,
    backgroundColor: "#fff",
    borderRadius: 7,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#dee2e6",
    // margin: 3,
  },

  quickMenusItemIcon: {
    marginBottom: 10,
    fontWeight: "900",
    marginRight: 15,
    marginLeft: 20,
  },

  quickMenusItemText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
    marginTop: -5,
  },
});
