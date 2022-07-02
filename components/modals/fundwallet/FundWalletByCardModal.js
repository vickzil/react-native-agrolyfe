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
  setLoading,
  setSelectCardModal,
  setFundWalletByCardModal,
  setAddCardModal,
} from "../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import CurrencyInput from "react-native-currency-input";
import { KeycodeInput } from "react-native-keycode";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import HeaderBalance from "../../extra/HeaderBalance";

const { width } = Dimensions.get("screen");

const FundWalletByCardModal = () => {
  const modal = useSelector((state) => state.alert.fundWalletByCardModal);
  const [amount, setAmount] = useState(null);
  const [step, setStep] = useState(1);
  const [buttonText, setButtonText] = useState("Proceed");
  const [emptyFields, setEmptyFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const closeModal = () => {
    dispatch(
      setFundWalletByCardModal({
        status: false,
        card: null,
      }),
    );

    setAmount(null);
    setStep(1);
    setButtonText("Proceed");
    setEmptyFields(true);
    setIsEnabled(false);
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
      setEmptyFields(false);
    }
    if (step === 3) {
      if (!isEnabled) {
        setEmptyFields(true);

        return;
      }

      setEmptyFields(false);
    }
  }, [step, amount, isEnabled]);

  const previousStep = () => {
    if (step === 1) {
      closeModal();

      return;
    }
    if (step === 2) {
      setStep(1);
      setButtonText("Continue");

      return;
    }
    if (step === 3) {
      setStep(2);
      setButtonText("Fund wallet");

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
        setButtonText("Continue");

        return;
      }
      if (step === 2) {
        setStep(3);
        setButtonText("Fund wallet");

        return;
      }

      if (step === 3) {
        closeModal();
      }
    }, 1400);
  };

  const addCard = () => {
    dispatch(setAddCardModal(true));
  };

  return (
    <Modal visible={modal?.status} animationType="fade" onRequestClose={() => closeModal()}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={[{ backgroundColor: colors.greenDarkColor }]}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="chevron-left"
              size={33}
              style={[styles.modalHeaderIcon, { color: "#fff", padding: 2 }]}
              onPress={() => previousStep()}
            />
            <Text style={styles.modalHeaderText}>Fund wallet By Card</Text>
            <Text></Text>
          </View>
          <HeaderBalance />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            {step === 1 && (
              <View style={styles.productCardContent}>
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
                <View
                  style={[
                    styles.productCardContentItem,
                    { borderBottomWidth: 1, borderColor: "#f0f0f0", marginBottom: 30 },
                  ]}
                >
                  <Text style={styles.productCardContentItemLeft}> Card</Text>
                  <TouchableOpacity
                    style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                    activeOpacity={0.7}
                    onPress={() =>
                      dispatch(
                        setSelectCardModal({
                          status: true,
                          type: "Fund_WALLET_BY_CARD",
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
                        <Text
                          style={[
                            styles.productCardContentItemRight,
                            { fontWeight: "700", color: "rgb(63, 156, 243)" },
                          ]}
                        >
                          {modal?.card ? modal.card?.name : "Select card"}{" "}
                          {modal?.card ? " - " + modal.card?.accountNumber : null}
                        </Text>
                      </View>

                      <Icon
                        name="chevron-right"
                        size={53}
                        style={[styles.modalHeaderIcon, { color: "rgb(63, 156, 243)", fontSize: 23, marginRight: 0 }]}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[styles.productCardContentItem, { marginTop: -20 }]}>
                  <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => addCard()}>
                    <Icon name="plus" size={24} style={[{ color: "rgb(63, 156, 243)", padding: 2 }]} />
                    <Text style={[styles.productCardContentItemLeft, { color: "rgb(63, 156, 243)" }]}> New card</Text>
                  </TouchableOpacity>

                  <Text style={[styles.productCardContentItemRight, { fontWeight: "700" }]}></Text>
                </View>
              </View>
            )}
            {step === 2 && (
              <View style={styles.productCardContent}>
                <Text
                  style={[
                    styles.productCardContentItemRight,
                    { fontWeight: "700", textAlign: "center", marginBottom: 27, fontSize: 22 },
                  ]}
                >
                  Summary
                </Text>

                <View style={[styles.productCardContentItem, { marginBottom: 0, paddingBottom: 10 }]}>
                  <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Amount</Text>
                  <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>
                    ₦ 890,000
                  </Text>
                </View>
                <View style={[styles.productCardContentItem, { marginBottom: 0, paddingBottom: 10 }]}>
                  <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Card</Text>
                  <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>
                    {modal.card?.name + " - " + modal.card?.accountNumber}
                  </Text>
                </View>
                <View style={[styles.productCardContentItem, { marginBottom: 0, paddingBottom: 20 }]}>
                  <Text style={[styles.productCardContentItemLeft, { fontSize: 19, fontWeight: "800" }]}>Total</Text>
                  <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 20 }]}>
                    ₦ 890,000
                  </Text>
                </View>
              </View>
            )}
            {step === 3 && (
              <View style={{ justifyContent: "center", width: "80%", marginTop: 50, alignItems: "center" }}>
                <Text
                  style={[styles.productCardContentItemLeft, { fontSize: 28, fontWeight: "900", marginBottom: 10 }]}
                >
                  Confirm Purchase
                </Text>
                <View style={{ alignItems: "center" }}>
                  <Text style={[globalStyles.label, { fontSize: 15, textAlign: "center" }]}>
                    Are you sure you want to purchase this products
                  </Text>
                  <Text style={[globalStyles.label, { fontSize: 15, textAlign: "center", color: colors.greenColor }]}>
                    I certify that I have read, understand and accept Terms & Conditions
                  </Text>
                </View>
                <View style={{ marginTop: 60 }}>
                  <Switch
                    trackColor={{ false: "#767577", true: colors.greenLightColor }}
                    thumbColor={isEnabled ? colors.greenColor : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ transform: [{ scaleX: 2.5 }, { scaleY: 2.4 }] }}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={globalStyles.buttonFloat}>
          <CustomLoadingButton
            onPress={() => procceed()}
            emptyFields={emptyFields}
            buttonText={buttonText}
            loading={loading}
          />
        </View>
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
    paddingTop: 26,
    marginBottom: 26,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },

  productCardContentItemLeft: {
    fontSize: 16,
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
export default FundWalletByCardModal;
