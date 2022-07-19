import "../ignoreWarnings";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import HomeHeader from "../components/home/HomeHeader";
import HomeWalletOverview from "../components/home/HomeWalletOverview";
import QuickMenus from "../components/home/QuickMenus";
import Transactions from "../components/transactions/Transactions";
import { useIsFocused } from "@react-navigation/native";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";
import { useDispatch, useSelector } from "react-redux";

import { otherGlobalFunctions } from "../store/utilities/actions";
import MarqueeTextSample from "../components/extra/MarqueeTextSample";
import { getUserInfo } from "../store/auth/actions";
import SvgComponent from "../components/customs/SvgComponent";
import HomeProducts from "../components/home/HomeProducts";
import { setSelectedMenu } from "../store/auth/authSlice";
import HomeAdverts from "../components/home/HomeAdverts";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState();
  const user = useSelector((state) => state.oauth.user);
  const userWalletBalance = useSelector((state) => state.wallet.userWalletBalance);
  const selectedMenu = useSelector((state) => state.oauth.selectedMenu);
  // const ref = useRef(null);
  const scrollViewRef = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(setSelectedMenu("Home"));
    return () => {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    };
  }, [isFocused]);

  useEffect(() => {
    dispatch(setSelectedMenu("Home"));
  }, [selectedMenu]);

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  useEffect(() => {}, [userWalletBalance, user]);

  const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   // getUserInfos()
  //   //   .then((response) => {
  //   //     // dispatch(saveUserInfo(response?.data));

  //   //     console.log(response);
  //   //     setTimeout(() => {
  //   //       setRefreshing(false);
  //   //     }, 2000);
  //   //   })
  //   //   .catch(() => {
  //   //     setRefreshing(false);
  //   //   });

  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 3000);

  //   // getAllTransactions().then((response) => {
  //   //   dispatch(saveUserTransactions(response?.data));

  //   //   dispatch(otherFunctions());
  //   // });
  // }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getUserInfo(user?.code));
    dispatch(otherGlobalFunctions());
    setTimeout(() => {
      setRefreshing(false);
    }, 3500);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SvgComponent />
      <FocusAwareStatusBar backgroundColor="#25453b" barStyle="light-content" />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <HomeHeader navigation={navigation} />

        <HomeWalletOverview />
        <View style={{ paddingHorizontal: 15, paddingBottom: 70 }}>
          <HomeProducts />
          {/* <MarqueeTextSample /> */}

          <QuickMenus navigation={navigation} />

          <HomeAdverts />

          {/* <View style={[{ marginTop: -20, alignItems: "center" }]}>
            <Image
              source={require("../assets/img/logo.png")}
              style={{ width: 160, height: 160 }}
              resizeMode="contain"
            />
          </View> */}
        </View>
      </ScrollView>

      {/* <MenuButtons navigation={navigation} /> */}
    </SafeAreaView>
  );
};

export default Home;
