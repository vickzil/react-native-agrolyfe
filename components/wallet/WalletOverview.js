import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import WalletItem from "./WalletItem";

const WalletOverview = () => {
  const userWalletBalance = useSelector((state) => state.wallet.userWalletBalance);

  const [overview] = useState([
    {
      id: 1,
      heading: "Main Balance",
      paragraph: userWalletBalance ? "₦ " + userWalletBalance?.availableBalance : "₦ 0",
      buttonText: "Fund Wallet",
      type: "Fund",
    },
    {
      id: 2,
      heading: "Commission Balance",
      paragraph: userWalletBalance ? "₦ " + userWalletBalance?.commissionAvailableBalance : "₦ 0",
      buttonText: "Transfer fund",
      type: "Transfer",
    },
    {
      id: 3,
      heading: "Maturity Balance",
      paragraph: userWalletBalance ? "₦ " + userWalletBalance?.investmentBalance : "₦ 0",
      buttonText: "Buy Airtime",
      type: "Paybills",
    },
  ]);
  return (
    <View style={{ horizontalPadding: 0, marginTop: 5, marginBottom: 20 }}>
      <FlatList
        horizontal
        data={overview}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <WalletItem item={item} index={index} />}
      />
    </View>
  );
};

export default WalletOverview;

const styles = StyleSheet.create({});
