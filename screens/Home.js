import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import HomeHeader from "../components/home/HomeHeader";
import HomeWalletOverview from "../components/home/HomeWalletOverview";
import QuickMenus from "../components/home/QuickMenus";
import Transactions from "../components/transactions/Transactions";
import { useIsFocused } from "@react-navigation/native";
import GeneralStatusBarColor from "../components/customs/statusbar/GeneralStatusBarColor";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";

const Home = ({ navigation }) => {
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

  // const logout = () => {
  //   AsyncStorage.setItem("user", JSON.stringify({ ...userDetails, loggedIn: false }));
  //   navigation.navigate("Login");
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusAwareStatusBar backgroundColor="#25453b" barStyle="light-content" />
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <HomeHeader navigation={navigation} />
        <HomeWalletOverview />
        <View style={{ paddingHorizontal: 15, paddingBottom: 70 }}>
          <QuickMenus navigation={navigation} />
          <Transactions />
        </View>
      </ScrollView>

      {/* <MenuButtons navigation={navigation} /> */}
    </SafeAreaView>
  );
};

export default Home;
