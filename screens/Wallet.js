import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Transactions from "../components/transactions/Transactions";
import { useIsFocused } from "@react-navigation/native";
import WalletHeader from "../components/wallet/WalletHeader";
import WalletButtons from "../components/wallet/WalletButtons";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { saveUserTransactions } from "../store/transactions/transactionSlice";
import { fetchAllInvestment, getMyInvestments } from "../store/products/actions";
import { otherFunctions, otherGlobalFunctions } from "../store/utilities/actions";
import { getUserInfo } from "../store/auth/actions";

const Wallet = ({ navigation }) => {
  const user = useSelector((state) => state.oauth.user);

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

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getUserInfo(user?.code));
    dispatch(otherGlobalFunctions());
    setTimeout(() => {
      setRefreshing(false);
    }, 3500);
  };

  return (
    <SafeAreaView>
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
