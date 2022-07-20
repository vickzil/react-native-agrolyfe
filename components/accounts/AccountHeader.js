import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setAboutModal,
  setAccountManagerModal,
  setAlertModal,
  setAntiPhizingModal,
  setBvnModal,
  setChangePasswordModal,
  setChangePinModal,
  setEditProfileModal,
  setFaqModal,
  setNextOfKinModal,
  setTermsAndCModal,
} from "../../store/alert/alertSlice";
import colors from "../../styles/colors";
import ScreenLoading from "../loader/ScreenLoading";
import AccountImageFullName from "./AccountImageFullName";
import axios from "axios";
import { getUserInfo } from "../../store/auth/actions";
import Logo from "../logo/Logo";
import { setDarkMode, setShowBalances, setTheme } from "../../store/auth/authSlice";
import { globalStyles } from "../../styles/global";

const { width } = Dimensions.get("screen");

const AccountHeader = () => {
  const user = useSelector((state) => state.oauth.user);
  const showBalances = useSelector((state) => state.oauth.showBalances);
  const theme = useSelector((state) => state.oauth.theme);
  const darkMode = useSelector((state) => state.oauth.darkMode);
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

  useEffect(() => {
    // if (darkMode) {
    //   dispatch(setDarkMode(true));
    // } else {
    //   dispatch(setDarkMode(false));
    // }
  }, [darkMode]);

  const toggleBalance = () => {
    let newShowBalance = !showBalances;
    dispatch(setShowBalances(newShowBalance));
    AsyncStorage.setItem("showBalances", JSON.stringify(newShowBalance));
  };

  const toggleDarkMode = () => {
    let newMode = !darkMode;
    dispatch(setDarkMode(newMode));
    AsyncStorage.setItem("darkMode", JSON.stringify(newMode));

    console.log(darkMode);
  };

  const handleThemeChange = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
    setTimeout(() => {
      AsyncStorage.setItem("theme", theme === "light" ? "dark" : "light");
    }, 500);
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

  // useEffect(() => {
  //   setTheme(theme);
  // }, [theme]);

  return (
    <View style={[styles.container, theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight]}>
      <ScreenLoading visibility={{ status: isLoading, message: "Please wait ..." }} />

      <View style={[styles.headerBg, { backgroundColor: colors.greenDarkColor }]}></View>
      <View
        style={[
          styles.headerImageContainer,
          theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
        ]}
      >
        <View style={styles.accountContainer}>
          <AccountImageFullName />
        </View>

        <View style={styles.accountTabs}>
          <Text style={[styles.accountTabsTitle, { color: colors.greenLightDarkColor }]}>Account</Text>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setEditProfileModal(true))}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              Update Profile
            </Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setNextOfKinModal(true))}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              Next of kin
            </Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setAccountManagerModal(true))}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              Account Manager
            </Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
        </View>
        {(user && user?.bvn === null) || user?.bvn === "null" ? (
          <View style={styles.accountTabs}>
            <Text style={[styles.accountTabsTitle, { color: colors.greenLightDarkColor }]}>Verification</Text>
            <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setBvnModal(true))}>
              <Text
                style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
              >
                Bvn
              </Text>
              <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.accountTabs}>
          <Text style={[styles.accountTabsTitle, { color: colors.greenLightDarkColor }]}>Security</Text>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setChangePinModal(true))}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              Change Pin
            </Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setChangePasswordModal(true))}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              Change Password
            </Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.accountTabsLinks} onPress={() => dispatch(setAntiPhizingModal(true))}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              Anti-phishing{" "}
            </Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.accountTabsLinks, { paddingVertical: 7 }]}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              Two-Factor Authentication{" "}
            </Text>
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
          <TouchableOpacity style={[styles.accountTabsLinks, { paddingVertical: 7 }]}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              Show Balances{" "}
            </Text>
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

          <TouchableOpacity style={[styles.accountTabsLinks, { paddingVertical: 7 }]}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              Dark mode{" "}
            </Text>
            <View>
              <Switch
                trackColor={{ false: "#767577", true: colors.greenLightColor }}
                thumbColor={theme === "dark" ? colors.greenColor : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleThemeChange}
                value={theme === "dark" ? true : false}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.accountTabs}>
          <Text style={[styles.accountTabsTitle, { color: colors.greenLightDarkColor }]}>About Agrolyfe</Text>
          <TouchableOpacity style={[styles.accountTabsLinks]} onPress={() => dispatch(setAboutModal(true))}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              About
            </Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.accountTabsLinks]} onPress={() => dispatch(setFaqModal(true))}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              FAQs
            </Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.accountTabsLinks]} onPress={() => dispatch(setTermsAndCModal(true))}>
            <Text
              style={[styles.accountTabsLinkText, theme === "dark" ? globalStyles.textLight : globalStyles.textDark]}
            >
              Terms & Conditions
            </Text>
            <Icon name="right" size={13} style={[styles.accountTabsRightAngel]} />
          </TouchableOpacity>
        </View>
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
