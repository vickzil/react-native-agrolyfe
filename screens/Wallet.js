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
import { otherFunctions } from "../store/utilities/actions";

const Wallet = ({ navigation }) => {
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

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

  const getUserInfos = async () => {
    let savedToken = AsyncStorage.getItem("token");
    const userToken = "Bearer " + bearerToken || "Bearer " + savedToken;
    const response = await axios.post(
      `${baseURL}/v1.0/Dashboard/getUserInfo`,
      {
        AppId: AppId,
        RequestId: RequestId,
        UserCode: user?.code,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
      },
    );

    return response;
  };

  const getAllTransactions = async () => {
    const response = await axios.post(
      `${baseURL}/v1.0/Wallet/getUserTransactionInfo`,
      {
        AppId: AppId,
        RequestId: RequestId,
        UserCode: user?.code,
        TransactionType: "",
        PageSize: 20,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      },
    );

    return response;
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserInfos()
      .then((response) => {
        dispatch(saveUserInfo(response?.data?.data));

        // console.log(response.data?.data);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      })
      .catch(() => {
        setRefreshing(false);
      });

    getAllTransactions().then((response) => {
      dispatch(saveUserTransactions(response?.data?.data));
      dispatch(otherFunctions());

      // console.log(response?.data?.data);
    });
  }, []);

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
