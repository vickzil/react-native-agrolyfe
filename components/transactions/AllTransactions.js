import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";
import TransactionItem from "./TransactionItem";
import NoItem from "../extra/NoItem";
import { useSelector } from "react-redux";
import LoadingComponents from "../loader/LoadingComponents";
import colors from "../../styles/colors";

const AllTransactions = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const loading = useSelector((state) => state.transactions.loading);
  const theme = useSelector((state) => state.oauth.theme);
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    if (transactions && transactions.transactions && transactions.transactions.length) {
      let newFilter = transactions.transactions;
      setAllTransactions(newFilter);
    }
  }, [transactions]);

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
      {loading ? (
        <View
          style={{
            marginTop: 40,
            backgroundColor: theme === "dark" ? colors.darkBody : "#f5f5f5",
            padding: 30,
            alignItems: "center",
            paddingTop: 50,
            height: "100%",
            width: "100%",
          }}
        >
          <LoadingComponents />
          <Text style={[globalStyles.label, theme === "dark" && globalStyles.textLight]}>Loading transactions...</Text>
        </View>
      ) : allTransactions && allTransactions.length ? (
        allTransactions?.map((item, index) => <TransactionItem item={item} key={index} index={index} />)
      ) : (
        <View style={{ marginTop: 40 }}>
          <NoItem item={{ type: "TRANSACTIONS", buttonText: "", message: "You have no transactions" }} />
        </View>
      )}
    </View>
  );
};

export default AllTransactions;
