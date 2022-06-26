import { Text, View } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/global";
import AllTransactionItem from "./AllTransactionItem";
import NoItem from "../extra/NoItem";

const AllTransactions = () => {
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
    <View
      style={{
        // flex: 1,
        width: "95%",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 40,
        paddingRight: 0,
        marginRight: 0,
      }}
    >
      {transactions.length ? (
        transactions.map((item, index) => <AllTransactionItem item={item} key={index} index={index} />)
      ) : (
        <NoItem item={{ type: "TRANSACTIONS", buttonText: "", message: "You have no transactions " }} />
      )}
    </View>
  );
};

export default AllTransactions;
