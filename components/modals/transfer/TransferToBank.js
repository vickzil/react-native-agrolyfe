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
import { setLoading, setSelectBankModal, setTransferToBankModal } from "../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import CurrencyInput from "react-native-currency-input";
import { KeycodeInput } from "react-native-keycode";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import HeaderBalance from "../../extra/HeaderBalance";

const { width } = Dimensions.get("screen");

const TransferToBankModal = () => {
  const modal = useSelector((state) => state.alert.transferToBankModal);
  const [amount, setAmount] = useState(null);
  const [pin, setPin] = useState(null);
  const [step, setStep] = useState(1);
  const [buttonText, setButtonText] = useState("Proceed");
  const [emptyFields, setEmptyFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setTransferToBankModal({
        status: false,
        bank: null,
      }),
    );

    setAmount(null);
    setPin(null);
    setStep(1);
    setButtonText("Proceed");
    setEmptyFields(true);
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
              size={33}
              style={[styles.modalHeaderIcon, { color: "#fff", padding: 2 }]}
              onPress={() => previousStep()}
            />
            <Text style={styles.modalHeaderText}>Transfer to bank</Text>
            <Text></Text>
          </View>
          <HeaderBalance />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            {step === 1 ? (
              <View style={styles.productCardContent}>
                <View style={styles.productCardContentItem}>
                  <Text style={styles.productCardContentItemLeft}>Bank</Text>
                  <TouchableOpacity
                    style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                    activeOpacity={0.7}
                    onPress={() =>
                      dispatch(
                        setSelectBankModal({
                          status: true,
                          type: "TRANSFER_TO_BANK",
                        }),
                      )
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginRight: -5,
                      }}
                    >
                      <View style={{ marginRight: 10, justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <Text style={[styles.productCardContentItemRight, { fontWeight: "700" }]}>
                          {modal?.bank ? modal.bank?.name : "Select Bank"}
                        </Text>
                        <Text style={[styles.productCardContentItemRight, { fontSize: 14 }]}>
                          {modal?.bank ? modal.bank?.accountNumber : null}
                        </Text>
                      </View>

                      <Icon
                        name="chevron-right"
                        size={53}
                        style={[styles.modalHeaderIcon, { color: "#222", fontSize: 23, marginRight: 0 }]}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 20, marginBottom: 50 }}>
                  <Text style={[styles.productCardContentItemLeft, { fontSize: 18 }]}>Amount</Text>
                  <CurrencyInput
                    value={amount}
                    onChangeValue={setAmount}
                    prefix="₦"
                    delimiter=","
                    // separator="."
                    precision={0}
                    // onChangeText={(formattedValue) => {
                    //   console.log(formattedValue);
                    // }}
                    style={[
                      globalStyles.inputTextt,
                      {
                        borderBottomWidth: 2,
                        borderColor: colors.greenColor,
                        fontSize: 25,
                        fontWeight: "900",
                        fontFamily: "PoppinsBold",
                      },
                    ]}
                  />
                </View>
              </View>
            ) : (
              <View style={{ justifyContent: "center", width: "80%", marginTop: 50, alignItems: "center" }}>
                <Text style={[styles.productCardContentItemLeft, { fontSize: 22, fontWeight: "900", marginBottom: 4 }]}>
                  Transaction Pin
                </Text>
                <View style={{ alignItems: "center" }}>
                  <Text style={[globalStyles.label, { fontSize: 15, textAlign: "center" }]}>
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
    paddingVertical: 17,
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
export default TransferToBankModal;
