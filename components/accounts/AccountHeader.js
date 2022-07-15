import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setAccountManagerModal,
  setAlertModal,
  setAntiPhizingModal,
  setBvnModal,
  setChangePasswordModal,
  setChangePinModal,
  setEditProfileModal,
  setNextOfKinModal,
} from "../../store/alert/alertSlice";
import colors from "../../styles/colors";
import ScreenLoading from "../loader/ScreenLoading";
import AccountImageFullName from "./AccountImageFullName";
import axios from "axios";
import { getUserInfo } from "../../store/auth/actions";
import Logo from "../logo/Logo";
import { setShowBalances } from "../../store/auth/authSlice";

const { width } = Dimensions.get("screen");

const AccountHeader = () => {
  const user = useSelector((state) => state.oauth.user);
  const showBalances = useSelector((state) => state.oauth.showBalances);
  const APPVERSION = useSelector((state) => state.oauth.APPVERSION);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    if (user) {
      if (user.is2FAEnabled === true) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    }
  }, [user]);

  const toggleBalance = () => {
    let newShowBalance = !showBalances;
    dispatch(setShowBalances(newShowBalance));
    AsyncStorage.setItem("showBalances", JSON.stringify(newShowBalance));
  };

  const toggleSwitch = () => {
    setIsLoading(true);

    axios
      .post(
        `${baseURL}/v1.0/OAuth/updateTwoFactorAuthentication`,
        {
          AppId: AppId,
          RequestId: RequestId,
          Email: user?.email,
          UserCode: user?.code,
          TwoFactorEnabled: isEnabled ? false : true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
          },
        },
      )
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          setIsLoading(false);

          dispatch(
            setAlertModal({
              status: true,
              type: "SUCCESS",
              title: isEnabled ? "Two-Factor Authentication disabled" : "Two-Factor Authentication Enabled",
              des: response.data.message,
              payload: null,
            }),
          );
          if (isEnabled) {
            setIsEnabled(false);
          } else {
            setIsEnabled(false);
          }

          dispatch(getUserInfo(user?.code));
        } else {
          setIsLoading(false);

          dispatch(
            setAlertModal({
              status: true,
              type: "error",
              title: " Error",
              des: response.data.message,
              payload: null,
            }),
          );
        }
      })
      .catch(() => {
        setIsLoading(false);

        dispatch(
          setAlertModal({
            status: true,
            type: "error",
            title: "Service Error",
            des: "Service is temporarily unavailable. Please try again in a few minutes.",
            payload: null,
          }),
        );
      });
  };

  return (
    <View style={styles.container}>
      <ScreenLoading visibility={{ status: isLoading, message: "Please wait ..." }} />

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
        {(user && user?.bvn === null) || user?.bvn === "null" ? (
          <View style={styles.accountTabs}>
            <Text style={[styles.accountTabsTitle, { color: colors.greenLightDarkColor }]}>Verification</Text>
            <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setBvnModal(true))}>
              <Text style={styles.accountTabsLinkText}>Bvn</Text>
              <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.accountTabs}>
          <Text style={[styles.accountTabsTitle, { color: colors.greenLightDarkColor }]}>Security</Text>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setChangePinModal(true))}>
            <Text style={styles.accountTabsLinkText}>Change Pin</Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setChangePasswordModal(true))}>
            <Text style={styles.accountTabsLinkText}>Change Password</Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setAntiPhizingModal(true))}>
            <Text style={styles.accountTabsLinkText}>Anti-phishing </Text>
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
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks}>
            <Text style={styles.accountTabsLinkText}>Show Balances </Text>
            <View>
              <Switch
                trackColor={{ false: "#767577", true: colors.greenLightColor }}
                thumbColor={showBalances ? colors.greenColor : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleBalance}
                value={showBalances}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              />
            </View>
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
            AGROLYFE APP VERSION {APPVERSION}
          </Text>
        </View>
        <View style={[styles.accountTabs, { marginTop: 20, alignItems: "center" }]}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={{ width: 160, height: 160 }}
            resizeMode="contain"
          />
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
