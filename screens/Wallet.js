import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Transactions from "../components/transactions/Transactions";
import { useIsFocused } from "@react-navigation/native";
import WalletHeader from "../components/wallet/WalletHeader";
import WalletButtons from "../components/wallet/WalletButtons";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";
import { useDispatch, useSelector } from "react-redux";
import { otherGlobalFunctions } from "../store/utilities/actions";
import { getUserInfo } from "../store/auth/actions";
import SvgComponent from "../components/customs/SvgComponent";
import { setRefreshing, setSelectedMenu } from "../store/auth/authSlice";

import * as Animatable from "react-native-animatable";
import { globalStyles } from "../styles/global";
import colors from "../styles/colors";

const Wallet = ({ navigation }) => {
  const user = useSelector((state) => state.oauth.user);
  const selectedMenu = useSelector((state) => state.oauth.selectedMenu);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();
  const refreshing = useSelector((state) => state.oauth.refreshing);

  const scrollViewRef = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    return () => {
      // if (isFocused) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
      // }
    };
  }, [isFocused]);

  useEffect(() => {
    dispatch(setSelectedMenu("Wallet"));
  }, [selectedMenu]);

  const onRefresh = () => {
    dispatch(setRefreshing(true));
    dispatch(getUserInfo(user?.code));
  };

  return (
    <SafeAreaView style={[{ flex: 1 }, theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight]}>
      <SvgComponent />
      <FocusAwareStatusBar backgroundColor={colors.greenDarkColor} barStyle="light-content" />

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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
