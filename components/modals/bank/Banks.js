import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import BankItem from "./BankItem";
import NoItem from "../../extra/NoItem";
import colors from "../../../styles/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { setAddBankModal } from "../../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../../styles/global";
import LoadingComponents from "../../loader/LoadingComponents";

const Banks = () => {
  const banks = useSelector((state) => state.bank.userBankAccount);
  const loading = useSelector((state) => state.bank.loading);

  const dispatch = useDispatch();
  const [hasBank] = useState(false);

  const [allBanks, setAllBanks] = useState([]);

  useEffect(() => {
    if (banks && banks.length) {
      setAllBanks(banks);
    }
  }, [banks]);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.productContainer]}>
          <View style={styles.bankGrid}>
            {loading ? (
              <View
                style={{
                  marginTop: 40,
                  backgroundColor: "#fff",
                  padding: 30,
                  alignItems: "center",
                  paddingTop: 50,
                  height: "100%",
                  width: "100%",
                }}
              >
                <LoadingComponents />
                <Text style={globalStyles.label}>Loading saved banks...</Text>
              </View>
            ) : allBanks && allBanks.length ? (
              allBanks?.map((item, index) => <BankItem item={item} key={index} index={index} />)
            ) : (
              <View style={{ marginTop: 40 }}>
                <NoItem
                  item={{ type: "BANK", buttonText: "Add Bank", message: "You haven't added any bank accounts" }}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {banks && banks.length && (
        <TouchableOpacity style={[styles.buttonFloat]}>
          <Text style={styles.buttonFloatText}>
            <MaterialIcons
              name="add"
              size={40}
              style={[{ color: "#fff" }]}
              onPress={() => dispatch(setAddBankModal(true))}
            />
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: 40,
    paddingBottom: 90,
  },

  bankGrid: {
    width: "92%",
    justifyContent: "center",
  },

  buttonFloat: {
    position: "absolute",
    right: 18,
    top: 520,
    // paddingVertical: 10,
  },

  buttonFloatText: {
    backgroundColor: colors.greenColor,
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "normal",
    fontWeight: "700",
    margin: 0,
    fontFamily: "Poppins",
    color: "#fff",
    padding: 12,
    borderRadius: 80,
    elevation: 1,
  },
});
export default Banks;
