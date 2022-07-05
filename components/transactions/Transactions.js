import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/global";
import TransactionItem from "./TransactionItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { setTransactionModal } from "../../store/alert/alertSlice";

const Transactions = () => {
  const dispatch = useDispatch();

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
  ]);

  return (
    <View>
      <View style={globalStyles.siteTitleWrapper}>
        <Text style={[globalStyles.siteTitle, { marginBottom: 0 }]}>Recent Transactions</Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => dispatch(setTransactionModal(true))}
        >
          <Text style={[globalStyles.siteTitle, { marginBottom: 0 }]}>See All</Text>
          <Icon name="arrow-right" size={19} style={[{ color: "#111", marginLeft: 4 }]} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 5, marginBottom: 40 }}>
        {transactions?.map((item, index) => (
          <TransactionItem item={item} key={index} index={index} />
        ))}
      </View>
    </View>
  );
};

export default Transactions;
