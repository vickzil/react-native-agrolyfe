import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddBankModal,
  setBankModal,
  setDefaultBank,
  setSelectWalletModal,
  setSelectedWallet,
  setTransferToBankModal,
} from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import NoItem from "../../extra/NoItem";
import LoadingComponents from "../../loader/LoadingComponents";
import { globalStyles } from "../../../styles/global";
import { addComma } from "../../helpers/globalFunction";

const { width } = Dimensions.get("screen");

const SelectWalletModal = () => {
  const modal = useSelector((state) => state.alert.selectWalletModal);
  const selectedWallet = useSelector((state) => state.alert.selectedWallet);
  const userWalletBalance = useSelector((state) => state.wallet.userWalletBalance);
  const loading = useSelector((state) => state.wallet.loading);

  const dispatch = useDispatch();

  const [allWalletBalance, setAllWalletBalance] = useState([]);

  useEffect(() => {
    if (userWalletBalance) {
      let formatedWallet = [
        {
          name: "Main balance",
          value: "main_balance",
          amount: userWalletBalance.availableBalance,
        },
        {
          name: "Commission balance",
          value: "commission_balance",
          amount: userWalletBalance.commissionAvailableBalance,
        },
        {
          name: "Maturity balance",
          value: "investment_balance",
          amount: userWalletBalance.investmentBalance,
        },
      ];
      setAllWalletBalance(formatedWallet);
    }
  }, [userWalletBalance]);

  const closeModal = () => {
    dispatch(
      setSelectWalletModal({
        status: false,
        type: "",
      }),
    );
  };

  const selectWallet = (item) => {
    closeModal();
    dispatch(setSelectedWallet(item));

    // if (modal.type === "ADD_BANK") {
    //   setSelectedWallet(item);
    // }
  };

  return (
    <Modal visible={modal?.status} animationType="fade" onRequestClose={() => closeModal()}>
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={{ marginTop: -40 }}>
        <View style={[styles.modalHeader, { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>Select Wallet</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
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
                <Text style={globalStyles.label}>Loading wallets...</Text>
              </View>
            ) : allWalletBalance && allWalletBalance.length ? (
              <View style={{ marginBottom: 20 }}>
                {allWalletBalance?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.container,
                      index === allWalletBalance.length - 1 && styles.removeElevation,
                      selectedWallet?.value === item.value && styles.selectedItem,
                    ]}
                    onPress={() => selectWallet(item)}
                  >
                    <View style={[styles.content]} key={index}>
                      <Text style={[styles.contentText, styles.contentText1]}>{item.name}</Text>
                      <Text style={[styles.contentText, styles.contentText2]}>
                        {item ? "₦ " + addComma(item?.amount) : "0.00"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>
        </ScrollView>
        {/* <Banks /> */}
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,
    elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Montserrat",
    color: "#222",
    marginLeft: -45,
  },

  modalSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 30,
  },

  container: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 2,
    elevation: 1,
  },

  removeElevation: {
    elevation: 0,
  },

  content: {
    width: "95%",
  },

  contentText: {
    fontFamily: "Poppins",
  },

  contentText1: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 5,
  },

  contentText2: {
    fontSize: 14,
    color: colors.greenColor,
  },

  selectedItem: {
    width: "97%",
    borderWidth: 3,
    borderColor: "#e79b0e",
    marginLeft: 5,
  },
});
export default SelectWalletModal;
