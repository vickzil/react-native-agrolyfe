import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../../styles/global";
import TransactionItem from "./TransactionItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { setTransactionModal } from "../../store/alert/alertSlice";
import LoadingComponents from "../loader/LoadingComponents";
import NoItem from "../extra/NoItem";

const Transactions = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const loading = useSelector((state) => state.transactions.loading);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();

  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    if (transactions && transactions.transactions && transactions.transactions.length) {
      let newFilter = transactions.transactions.slice(0, 4);
      setAllTransactions(newFilter);
    }
  }, [transactions]);

  return (
    <View>
      <View style={globalStyles.siteTitleWrapper}>
        <Text style={[globalStyles.siteTitle, { marginBottom: 0 }, theme === "dark" && globalStyles.textLight]}>
          Recent Transactions
        </Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => dispatch(setTransactionModal(true))}
        >
          <Text style={[globalStyles.siteTitle, { marginBottom: 0 }, theme === "dark" && globalStyles.textLight]}>
            See All
          </Text>
          <Icon
            name="arrow-right"
            size={19}
            style={[{ color: "#111", marginLeft: 4 }, theme === "dark" && globalStyles.textLight]}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 5, marginBottom: 40 }}>
        {loading ? (
          <View
            style={[
              {
                marginTop: 40,
                backgroundColor: "#fff",
                padding: 30,
                alignItems: "center",
                paddingTop: 50,
                height: 150,
                width: "100%",
              },
              theme === "dark" && globalStyles.cardDark,
            ]}
          >
            <LoadingComponents />
            <Text style={[globalStyles.label, theme === "dark" && globalStyles.textLight]}>
              Loading transactions...
            </Text>
          </View>
        ) : allTransactions && allTransactions.length ? (
          allTransactions?.map((item, index) => <TransactionItem item={item} key={index} index={index} />)
        ) : (
          <View style={{ marginTop: 40 }}>
            <NoItem item={{ type: "TRANSACTIONS", buttonText: "", message: "You have no transactions" }} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Transactions;
