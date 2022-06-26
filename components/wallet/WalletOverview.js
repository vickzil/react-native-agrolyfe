import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import WalletItem from "./WalletItem";

const WalletOverview = () => {
  const [overview] = useState([
    {
      id: 1,
      heading: "Main Balance",
      paragraph: "₦0",
      buttonText: "Fund Wallet",
      type: "Fund",
    },
    {
      id: 2,
      heading: "Commission Balance",
      paragraph: "₦0",
      buttonText: "Transfer fund",
      type: "Transfer",
    },
    {
      id: 3,
      heading: "Maturity Balance",
      paragraph: "₦0",
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
