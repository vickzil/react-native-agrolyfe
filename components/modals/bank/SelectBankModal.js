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
  setSelectBankModal,
  setSelectedBank,
  setTransferToBankModal,
} from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import NoItem from "../../extra/NoItem";
import LoadingComponents from "../../loader/LoadingComponents";
import { globalStyles } from "../../../styles/global";
import AnimatedViewComp from "../../customs/AnimatedViewComp";

const { width } = Dimensions.get("screen");

const SelectBankModal = () => {
  const modal = useSelector((state) => state.alert.selectBankModal);
  const selectedBank = useSelector((state) => state.alert.selectedBank);
  const banks = useSelector((state) => state.bank.userBankAccount);
  const loading = useSelector((state) => state.bank.loading);
  const theme = useSelector((state) => state.oauth.theme);

  const dispatch = useDispatch();

  const [allBanks, setAllBanks] = useState([]);

  useEffect(() => {
    if (banks && banks.length) {
      setAllBanks(banks);
    }
  }, [banks]);

  const closeModal = () => {
    dispatch(
      setSelectBankModal({
        status: false,
        type: "",
      }),
    );
  };

  const selectBank = (item) => {
    dispatch(setSelectedBank(item));
    if (modal.type === "TRANSFER_TO_BANK") {
      // dispatch(
      //   setTransferToBankModal({
      //     status: true,
      //     bank: item,
      //   }),
      // );

      console.log(item);
    }

    closeModal();

    // if (modal.type === "ADD_BANK") {
    //   setSelectedBank(item);
    // }
  };

  return (
    <Modal visible={modal?.status} animationType="fade" onRequestClose={() => closeModal()}>
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkBody} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <View
        style={[
          { flex: 1, marginTop: -40 },
          theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
        ]}
      >
        <View style={[styles.modalHeader, theme === "dark" ? globalStyles.containerDark : { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, theme === "dark" ? globalStyles.textLight : { color: "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}>Select Bank Accounts</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            {loading ? (
              <View
                style={{
                  marginTop: 40,
                  backgroundColor: theme === "dark" ? colors.darkCard : "#fff",
                  padding: 30,
                  alignItems: "center",
                  paddingTop: 50,
                  height: "100%",
                  width: "100%",
                }}
              >
                <LoadingComponents />
                <Text style={[globalStyles.label, theme === "dark" && globalStyles.textLight]}>
                  Loading saved banks...
                </Text>
              </View>
            ) : allBanks && allBanks.length ? (
              <View style={{ marginBottom: 20, paddingHorizontal: 10 }}>
                {allBanks?.map((item, index) => (
                  <AnimatedViewComp index={index} key={index}>
                    <TouchableOpacity
                      style={[
                        styles.container,
                        index === allBanks.length - 1 && styles.removeElevation,
                        selectedBank?.code === item.code && styles.selectedItem,
                        theme === "dark" && globalStyles.cardDark,
                      ]}
                      onPress={() => selectBank(item)}
                    >
                      <View style={[styles.content]}>
                        <Text
                          style={[styles.contentText, styles.contentText1, theme === "dark" && globalStyles.textLight]}
                        >
                          {item.bankName}
                        </Text>
                        <Text style={[styles.contentText, styles.contentText2]}>{item.accountNumber}</Text>
                      </View>
                    </TouchableOpacity>
                  </AnimatedViewComp>
                ))}

                <View style={{ marginTop: 90, alignItems: "center", textAlign: "center" }}>
                  <View style={{ position: "relative", alignItems: "center" }}>
                    <Text style={{ position: "absolute", top: 10, backgroundColor: "#ced4ed", width: 300, height: 2 }}>
                      {" "}
                    </Text>
                    <Text
                      style={[
                        styles.contentText,
                        styles.contentText1,
                        { backgroundColor: "#fff", padding: 5, marginTop: -5 },
                        theme === "dark" && globalStyles.containerDark,
                        theme === "dark" && globalStyles.textLight,
                      ]}
                    >
                      OR
                    </Text>
                    <View style={{ marginTop: 30 }}>
                      <TouchableOpacity
                        style={[globalStyles.button, { paddingHorizontal: 50 }]}
                        onPress={() => dispatch(setAddBankModal(true))}
                      >
                        <Text
                          style={[
                            {
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: 17,
                              lineHeight: 29,
                              marginBottom: 0,
                              fontFamily: "Poppins",
                              color: "#fff",
                              textAlign: "center",
                            },
                          ]}
                        >
                          Add Bank
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{ marginTop: 40 }}>
                <NoItem
                  item={{ type: "BANK", buttonText: "Add Bank", message: "You haven't added any bank accounts" }}
                />
              </View>
            )}
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
    fontWeight: "600",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "PoppinsBold",
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
export default SelectBankModal;
