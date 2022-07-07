import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import HomeWalletItem from "./HomeWalletItem";

const HomeWalletOverview = () => {
  const userWalletBalance = useSelector((state) => state.wallet.userWalletBalance);

  const [overview] = useState([
    {
      id: 1,
      heading: "Main wallet Balance",
      paragraph: userWalletBalance ? "₦ " + userWalletBalance?.availableBalance : "₦ 0",
      buttonText: "Fund Wallet",
      type: "Fund",
    },
    {
      id: 2,
      heading: "Transfer Fund",
      paragraph: "transfer",
      buttonText: "Transfer fund",
      type: "Transfer",
    },
    {
      id: 3,
      heading: "airtime/data/carble",
      paragraph: "Paybills",
      buttonText: "Buy Airtime",
      type: "Paybills",
    },
  ]);
  return (
    <View style={{ horizontalPadding: 25, marginTop: -110, marginBottom: 30 }}>
      <FlatList
        horizontal
        data={overview}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <HomeWalletItem item={item} index={index} />}
      />
    </View>
  );
};

export default HomeWalletOverview;

const styles = StyleSheet.create({});
