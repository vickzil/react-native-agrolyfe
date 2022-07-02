import { Dimensions, Modal, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMakeInvestmentModal } from "../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import CurrencyInput from "react-native-currency-input";
import { KeycodeInput } from "react-native-keycode";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";

const { width } = Dimensions.get("screen");

const MakeInvestmentModal = () => {
  const modal = useSelector((state) => state.alert.makeInvestmentModal);
  const [amount, setAmount] = useState(null);
  const [pin, setPin] = useState(null);
  const [calculatedItem, setCalculatedItem] = useState(null);
  const [step, setStep] = useState(1);
  const [buttonText, setButtonText] = useState("Proceed");
  const [emptyFields, setEmptyFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setMakeInvestmentModal({
        status: false,
        bank: null,
      }),
    );

    setAmount(null);
    setPin(null);
    setCalculatedItem(null);
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
    setEmptyFields(false);

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
      setButtonText("Proceed");

      return;
    }
    if (step === 3) {
      setStep(2);
      setButtonText("Purchase Now");

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
        setButtonText("Purchase Now");

        return;
      }
      if (step === 2) {
        setStep(3);
        setButtonText("Submit");

        return;
      }
      if (step === 3) {
        closeModal();
      }
    }, 1400);
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
            <Text style={styles.modalHeaderText}>Purchase Product</Text>
            <Text></Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            {step === 1 && (
              <View style={styles.productCardContent}>
                <View style={styles.productCardContentItem}>
                  <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Product</Text>
                  <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>
                    Agrovest
                  </Text>
                </View>
                <View style={styles.productCardContentItem}>
                  <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Rental fee (%)</Text>
                  <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>20%</Text>
                </View>

                <View style={{ marginTop: 50, marginBottom: 50 }}>
                  <Text style={[styles.productCardContentItemLeft, { fontSize: 22, color: "#444", fontWeight: "700" }]}>
                    Amount
                  </Text>
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
                <Text
                  style={[
                    styles.productCardContentItemLeft,
                    { textAlign: "center", fontSize: 17, marginBottom: 10, fontWeight: "800" },
                  ]}
                >
                  NGN 1,050,200 will be paid to you at the end of the 12 months investment cycle.
                </Text>
                <Text
                  style={[
                    styles.productCardContentItemLeft,
                    { textAlign: "center", fontSize: 15, marginBottom: 20, color: "#555" },
                  ]}
                >
                  This is as computed using the prevailent rate(s) at this point in time.
                </Text>
                <View
                  style={{
                    paddingHorizontal: 19,
                    paddingVertical: 14,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#ced4ed",
                  }}
                >
                  <View style={[styles.productCardContentItem, { marginBottom: 0, paddingBottom: 10 }]}>
                    <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Principal</Text>
                    <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>
                      ₦ 890,000
                    </Text>
                  </View>
                  <View style={[styles.productCardContentItem, { marginBottom: 0, paddingBottom: 10 }]}>
                    <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Rental Fee (%)</Text>
                    <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>20%</Text>
                  </View>
                  <View style={[styles.productCardContentItem, { marginBottom: 0, paddingBottom: 10 }]}>
                    <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Post Charges</Text>
                    <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>
                      ₦ 160,200
                    </Text>
                  </View>
                  <View style={[styles.productCardContentItem, { marginBottom: 0, paddingBottom: 10 }]}>
                    <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Mgt. Fee</Text>
                    <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>
                      ₦ 17,800 (10%)
                    </Text>
                  </View>
                  <View style={[styles.productCardContentItem, { marginBottom: 0, paddingBottom: 10 }]}>
                    <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Duration</Text>
                    <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>
                      12 Months
                    </Text>
                  </View>
                  <View style={[styles.productCardContentItem, { marginBottom: 0, paddingBottom: 10 }]}>
                    <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Frequency</Text>
                    <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>none</Text>
                  </View>
                  <View style={[styles.productCardContentItem, { marginBottom: 0, paddingBottom: 10 }]}>
                    <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>Currency</Text>
                    <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>NGN</Text>
                  </View>
                  <View
                    style={[styles.productCardContentItem, { marginTop: 0, marginBottom: 0, borderBottomWidth: 0 }]}
                  >
                    <Text style={[styles.productCardContentItemLeft, { fontSize: 15 }]}>State</Text>
                    <Text style={[styles.productCardContentItemRight, { fontWeight: "800", fontSize: 15 }]}>Lagos</Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.productCardContentItemRight,
                    {
                      fontWeight: "700",
                      textAlign: "left",
                      marginBottom: 7,
                      fontSize: 18,
                      marginTop: 70,
                    },
                  ]}
                >
                  Note:
                </Text>
                <Text
                  style={[
                    styles.productCardContentItemLeft,
                    { textAlign: "left", fontSize: 16, marginBottom: 0, fontWeight: "600", color: "#555" },
                  ]}
                >
                  After purchase of the farm land, a farmer will be assigned to your purchased land for farming
                  activities within a month. On a quarterly basis, a farm rental fee of NGN 44500.00 will be credited to
                  your wallet. This means a total of NGN 160200.00 will be credited to your after the 20.00 farming
                  cycle. A total of NGN 1050200.00 would have been paid to you after the farming cycle.
                </Text>
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
    width: "100%",
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
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },

  productCardContentItemLeft: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.greenLightDarkColor,
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
export default MakeInvestmentModal;
