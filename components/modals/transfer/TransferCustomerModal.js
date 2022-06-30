import {
  Dimensions,
  FlatList,
  Image,
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
  setLoading,
  setSelectBankModal,
  setSelectedUser,
  setTransferToCustomerModal,
} from "../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import CurrencyInput from "react-native-currency-input";
import { KeycodeInput } from "react-native-keycode";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import HeaderBalance from "../../extra/HeaderBalance";

const { width } = Dimensions.get("screen");

const TransferCustomerModal = () => {
  const modal = useSelector((state) => state.alert.transferToCustomerModal);
  const [amount, setAmount] = useState(null);
  const [pin, setPin] = useState(null);
  const [step, setStep] = useState(1);
  const [buttonText, setButtonText] = useState("Proceed");
  const [emptyFields, setEmptyFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = require("../../../assets/img/user.jpg");

  const closeModal = () => {
    dispatch(
      setTransferToCustomerModal({
        status: false,
        user: null,
      }),
    );

    setAmount(null);
    setPin(null);
    setStep(1);
    setButtonText("Proceed");
    setEmptyFields(true);

    dispatch(setSelectedUser(null));
  };

  useEffect(() => {
    if (step === 1) {
      if (!amount) {
        setEmptyFields(true);

        return;
      }
      if (amount && amount < 100) {
        setEmptyFields(true);

        return;
      }

      setEmptyFields(false);
    }
    if (step === 2) {
      if (!pin) {
        setEmptyFields(true);

        return;
      }
      if (pin && pin.length < 4) {
        setEmptyFields(true);

        return;
      }

      setEmptyFields(false);
    }
  }, [step, amount, pin]);

  const previousStep = () => {
    if (step === 1) {
      closeModal();

      return;
    }
    if (step === 2) {
      setStep(1);
      setButtonText("Proceed");

      return;
    }
  };

  const procceed = () => {
    setEmptyFields(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === 1) {
        setStep(2);
        setButtonText("Submit");

        return;
      }
      if (step === 2) {
        closeModal();
      }
    }, 1400);
  };

  return (
    <Modal visible={modal?.status} animationType="slide" onRequestClose={() => closeModal()}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={[{ backgroundColor: colors.greenDarkColor }]}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="chevron-left"
              size={40}
              style={[styles.modalHeaderIcon, { color: "#fff", padding: 2, marginLeft: -10 }]}
              onPress={() => previousStep()}
            />
            <Text style={styles.modalHeaderText}>Transfer to {modal?.user?.userName || "customer"}</Text>
            <Text></Text>
          </View>
          <HeaderBalance />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            {step === 1 ? (
              <View style={styles.productCardContent}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}>
                  <View style={globalStyles.accountImage}>
                    <Image
                      source={user}
                      style={[{ width: "100%", height: "100%", borderRadius: 100 }]}
                      resizeMode="cover"
                    />
                  </View>

                  <Text style={globalStyles.accountUserFullName}>Victor Nwakwue</Text>
                  <Text style={globalStyles.accountTitle}>{modal?.user?.userName}</Text>
                </View>

                <View style={{ marginTop: 60, marginBottom: 50 }}>
                  <Text style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 30 }]}>Amount</Text>
                  <CurrencyInput
                    value={amount}
                    onChangeValue={setAmount}
                    prefix="₦ "
                    delimiter=","
                    // separator="."
                    precision={0}
                    // onChangeText={(formattedValue) => {
                    //   console.log(formattedValue);
                    // }}
                    style={[
                      globalStyles.inputTextt,
                      { borderBottomWidth: 2, borderColor: colors.greenColor, fontSize: 25 },
                    ]}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  width: "80%",
                  marginTop: 50,
                  alignItems: "center",
                  marginBottom: 50,
                }}
              >
                <Text style={[styles.productCardContentItemLeft, { fontSize: 29, fontWeight: "900", marginBottom: 4 }]}>
                  Transaction Pin
                </Text>
                <View style={{ alignItems: "center" }}>
                  <Text style={[globalStyles.label, { fontSize: 15, textAlign: "center", marginBottom: 60 }]}>
                    Enter your 4-digit TRANSACTION PIN to approve this transfer
                  </Text>
                </View>
                <KeycodeInput
                  style={{ fontFamily: "Poppins", letterSpacing: -0.35644 }}
                  alphaNumeric={false}
                  numeric={true}
                  tintColor={colors.greenColor}
                  keyboardType="numeric"
                  onChange={(value) => {
                    setPin(value);
                  }}
                  onComplete={(value) => {
                    setPin(value);
                  }}
                />
              </View>
            )}

            <CustomLoadingButton
              onPress={() => procceed()}
              emptyFields={emptyFields}
              buttonText={buttonText}
              loading={loading}
            />
          </View>
        </ScrollView>
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
    paddingVertical: 7,
    paddingHorizontal: 10,

    // elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
    color: "#fff",
    marginLeft: -45,
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 100,
  },

  productCardContent: {
    width: "96%",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 16,
    // shadowColor: "#171717",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.4,
    // shadowRadius: 2,
    // borderRadius: 10,
    // backgroundColor: "#fff",
    // borderBottomWidth: 1,
    // borderColor: "#f0f0f0",
    marginBottom: 20,
    paddingBottom: 0,
  },

  productCardContentItem: {
    flexDirection: "row",
    paddingBottom: 25,
    paddingTop: 9,
    justifyContent: "space-between",
  },

  productCardContentItemLeft: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginRight: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  productCardContentItemRight: {
    fontSize: 16,
    color: "#444",
    fontWeight: "600",
    justifyContent: "flex-end",
    fontFamily: "Montserrat",
  },
});
export default TransferCustomerModal;
