import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const Referrals = ({ navigation }) => {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>{/* <View style={{ paddingHorizontal: 15 }}></View> */}</ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Referrals;

const styles = StyleSheet.create({});
