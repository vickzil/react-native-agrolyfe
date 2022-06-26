import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import QuickMenus from "../components/home/QuickMenus";
import Transactions from "../components/transactions/Transactions";
import { useIsFocused } from "@react-navigation/native";
import WalletHeader from "../components/wallet/WalletHeader";
import WalletButtons from "../components/wallet/WalletButtons";
import GeneralStatusBarColor from "../components/customs/statusbar/GeneralStatusBarColor";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";

const Wallet = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState();
  // const ref = useRef(null);
  const scrollViewRef = useRef();
  const isFocused = useIsFocused();

  // useScrollToTop(
  //   useRef({
  //     scrollToTop: () => ref.current?.scrollToOffset({ offset: -100 }),
  //   }),
  // );

  useEffect(() => {
    if (isFocused) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }
  }, [isFocused]);

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  return (
    <SafeAreaView>
      <FocusAwareStatusBar backgroundColor="#25453b" barStyle="light-content" />
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <WalletHeader navigation={navigation} />

        <View style={{ paddingHorizontal: 15, paddingBottom: 70 }}>
          <WalletButtons />
          <Transactions />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallet;
