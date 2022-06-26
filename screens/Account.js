import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AccountHeader from "../components/accounts/AccountHeader";
import { useIsFocused } from "@react-navigation/native";
import GeneralStatusBarColor from "../components/customs/statusbar/GeneralStatusBarColor";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";

const Account = ({ navigation }) => {
  const scrollViewRef = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
