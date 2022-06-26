import { Text, View } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/global";
import TransactionItem from "./TransactionItem";

const Transactions = () => {
  const [transactions] = useState([
    {
      id: 1,
      date: new Date(),
      amount: "₦2000",
      description: "Saving's wallet No. 1 funding for savings with code SAVSHPY8X83SZVU",
      status: "success",
    },
    {
      id: 2,
      date: new Date(),
      amount: "₦12,000",
      description: "Saving's wallet No. 1 funding for savings with code SAVSHPY8X83SZVU",
      status: "success",
    },
    {
      id: 3,
      date: new Date(),
      amount: "₦62,000",
      description: "Saving's wallet No. 1 funding for savings with code SAVSHPY8X83SZVU",
      status: "success",
    },
    {
      id: 4,
      date: new Date(),
      amount: "₦2000",
      description: "Saving's wallet No. 1 funding for savings with code SAVSHPY8X83SZVU",
      status: "success",
    },
    {
      id: 5,
      date: new Date(),
      amount: "₦12,000",
      description: "Saving's wallet No. 1 funding for savings with code SAVSHPY8X83SZVU",
      status: "success",
    },
    {
      id: 6,
      date: new Date(),
      amount: "₦62,000",
      description: "Saving's wallet No. 1 funding for savings with code SAVSHPY8X83SZVU",
      status: "success",
    },
  ]);
  return (
    <View>
      <Text style={[globalStyles.siteTitle]}>Recent Transactions</Text>
      <View style={{ marginTop: 5, marginBottom: 40 }}>
        {transactions?.map((item, index) => (
          <TransactionItem item={item} key={index} index={index} />
        ))}
      </View>
    </View>
  );
};

export default Transactions;
