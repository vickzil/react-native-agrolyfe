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
import { setSelectedMenu } from "../store/auth/authSlice";

import * as Animatable from "react-native-animatable";

const Wallet = ({ navigation }) => {
  const user = useSelector((state) => state.oauth.user);
  const selectedMenu = useSelector((state) => state.oauth.selectedMenu);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

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
    setRefreshing(true);
    dispatch(getUserInfo(user?.code));
    dispatch(otherGlobalFunctions());
    setTimeout(() => {
      setRefreshing(false);
    }, 3500);
  };

  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  return (
    <SafeAreaView>
      <SvgComponent />
      <FocusAwareStatusBar backgroundColor="#25453b" barStyle="light-content" />

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
