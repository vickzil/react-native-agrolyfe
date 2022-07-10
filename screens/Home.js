import "../ignoreWarnings";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import HomeHeader from "../components/home/HomeHeader";
import HomeWalletOverview from "../components/home/HomeWalletOverview";
import QuickMenus from "../components/home/QuickMenus";
import Transactions from "../components/transactions/Transactions";
import { useIsFocused } from "@react-navigation/native";
import GeneralStatusBarColor from "../components/customs/statusbar/GeneralStatusBarColor";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";
import { setLogoutModal } from "../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { saveUserInfo } from "../store/auth/authSlice";
import { saveUserTransactions } from "../store/transactions/transactionSlice";
import { fetchAllInvestment, getMyInvestments } from "../store/products/actions";
import { getSavingsMainCategories, getUserSavings } from "../store/savings/actions";
import { getUserReferrals } from "../store/referrals/actions";
import { getAllUserBankAccounts } from "../store/bank/actions";
import { getUserWalletBalance, getWalletOptions } from "../store/wallet/actions";
import { getAccountMangager } from "../store/accountManager/actions";
import { getAirtimeDataProvidersPlans, getCableTVProviders } from "../store/utilities/actions";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState();
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);
  const userWalletBalance = useSelector((state) => state.wallet.userWalletBalance);

  // const ref = useRef(null);
  const scrollViewRef = useRef();
  const isFocused = useIsFocused();

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

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

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

  useEffect(() => {}, [userWalletBalance, user]);

  // const logout = () => {
  //   AsyncStorage.setItem("user", JSON.stringify({ ...userDetails, loggedIn: false }));
  //   navigation.navigate("Login");
  // };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserInfos()
      .then((response) => {
        dispatch(saveUserInfo(response?.data?.data));

        console.log(response.data?.data);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      })
      .catch(() => {
        setRefreshing(false);
      });

    getAllTransactions().then((response) => {
      dispatch(saveUserTransactions(response?.data?.data));

      // console.log(response?.data?.data);

      dispatch(fetchAllInvestment(user?.code));
      dispatch(getMyInvestments(user?.code));
      dispatch(getUserSavings(user?.code));
      dispatch(getSavingsMainCategories(user?.code));
      dispatch(getUserReferrals(user?.code));
      dispatch(getAccountMangager(user?.code));
      dispatch(getAllUserBankAccounts(user?.code));
      dispatch(getUserWalletBalance(user?.code));
      dispatch(getWalletOptions(user?.code));
      dispatch(getAirtimeDataProvidersPlans(user?.code));
      dispatch(getCableTVProviders(user?.code));
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusAwareStatusBar backgroundColor="#25453b" barStyle="light-content" />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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
