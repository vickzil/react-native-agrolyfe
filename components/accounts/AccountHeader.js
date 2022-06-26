import React, { useState } from "react";
import { Dimensions, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import {
  setAccountManagerModal,
  setAntiPhizingModal,
  setBvnModal,
  setChangePasswordModal,
  setEditProfileModal,
  setNextOfKinModal,
} from "../../store/alert/alertSlice";
import colors from "../../styles/colors";
import AccountImageFullName from "./AccountImageFullName";

const { width } = Dimensions.get("screen");

const AccountHeader = () => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={[styles.headerBg, { backgroundColor: colors.greenDarkColor }]}></View>
      <View style={styles.headerImageContainer}>
        <View style={styles.accountContainer}>
          <AccountImageFullName />
        </View>

        <View style={styles.accountTabs}>
          <Text style={[styles.accountTabsTitle, { color: colors.greenLightDarkColor }]}>Account</Text>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setEditProfileModal(true))}>
            <Text style={styles.accountTabsLinkText}>Update Profile</Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setNextOfKinModal(true))}>
            <Text style={styles.accountTabsLinkText}>Next of kin</Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setAccountManagerModal(true))}>
            <Text style={styles.accountTabsLinkText}>Account Manager</Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
        </View>
        <View style={styles.accountTabs}>
          <Text style={[styles.accountTabsTitle, { color: colors.greenLightDarkColor }]}>Verification</Text>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setBvnModal(true))}>
            <Text style={styles.accountTabsLinkText}>Bvn</Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
        </View>
        <View style={styles.accountTabs}>
          <Text style={[styles.accountTabsTitle, { color: colors.greenLightDarkColor }]}>Security</Text>
          <TouchableOpacity style={styles.accountTabsLinks}>
            <Text style={styles.accountTabsLinkText}>Change Pin</Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setChangePasswordModal(true))}>
            <Text style={styles.accountTabsLinkText}>Change Password</Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks}>
            <Text style={styles.accountTabsLinkText}>Two-Factor Authentication </Text>
            <View>
              <Switch
                trackColor={{ false: "#767577", true: colors.greenLightColor }}
                thumbColor={isEnabled ? colors.greenColor : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setAntiPhizingModal(true))}>
            <Text style={styles.accountTabsLinkText}>Anti-phishing </Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.accountTabs}>
          <Text style={[styles.accountTabsTitle, { color: colors.greenLightDarkColor }]}>Help & Support</Text>
          <TouchableOpacity style={[styles.accountTabsLinks]}>
            <Text style={styles.accountTabsLinkText}>FAQs</Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
        </View> */}
        <View style={[styles.accountTabs, { marginTop: 20 }]}>
          <Text style={{ color: "#999", textTransform: "uppercase", fontSize: 15 }}>
            OXFORD AGROLYFE APP VERSION 2.12.0
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
  },

  headerBg: {
    width,
    height: 130,
  },

  headerImageContainer: {
    backgroundColor: "#fff",
    paddingBottom: 130,
  },

  accountContainer: {
    marginTop: -60,
  },

  accountTabs: {
    width,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 0,
    paddingBottom: 0,
  },

  accountTabsTitle: {
    fontSize: 18,
    color: "#d3b7b7",
    // marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9e6e6",
    paddingVertical: 18,
  },

  accountTabsLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e9e6e6",
    paddingHorizontal: 5,
    paddingVertical: 15,
  },

  accountTabsLinkText: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#666",
  },

  accountTabsRightAngel: {
    color: "#888",
  },
});
export default AccountHeader;
