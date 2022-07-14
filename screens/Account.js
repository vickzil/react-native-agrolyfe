import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AccountHeader from "../components/accounts/AccountHeader";
import { useIsFocused } from "@react-navigation/native";
import GeneralStatusBarColor from "../components/customs/statusbar/GeneralStatusBarColor";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";
import SvgComponent from "../components/customs/SvgComponent";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMenu } from "../store/auth/authSlice";

const Account = ({ navigation }) => {
  const scrollViewRef = useRef();
  const isFocused = useIsFocused();
  const selectedMenu = useSelector((state) => state.oauth.selectedMenu);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    };
  }, [isFocused]);

  useEffect(() => {
    dispatch(setSelectedMenu("Account"));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SvgComponent />
      <FocusAwareStatusBar backgroundColor="#25453b" barStyle="light-content" />

      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <View>
          <AccountHeader />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
