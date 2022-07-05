import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTransferToBankModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import ScreenLoading from "../../loader/ScreenLoading";
import FAmount from "./toBank/FAmount";
import FSummary from "./toBank/FSummary";
import FConfirm from "./toBank/FConfirm";
import HeaderBalance from "../../extra/HeaderBalance";

const { width } = Dimensions.get("screen");
const screenHeight = Dimensions.get("window").height;

const TransferToBankModal = () => {
  const modal = useSelector((state) => state.alert.transferToBankModal);
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(null);
  const [summaryDetails, setSummaryDetails] = useState(null);
  const [pin, setPin] = useState(false);
  const [buttonText, setButtonText] = useState("Proceed");
  const [emptyFields, setEmptyFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState({
    status: false,
    message: "",
  });
  const [shouldScroll] = useState(false);
  const scrollViewRef2 = useRef(null);

  const closeModal = () => {
    dispatch(
      setTransferToBankModal({
        status: false,
        bank: null,
      }),
    );

    setAmount(null);
    setSummaryDetails(null);
    setStep(1);
    setButtonText("Proceed");
    setEmptyFields(true);
    setScreenLoading({
      status: false,
      message: "",
    });
    setPin(false);
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

      if (modal?.bank === null) {
        setEmptyFields(true);

        return;
      }

      setEmptyFields(false);
    }

    if (step === 2) {
      setEmptyFields(false);
    }

    if (step === 3) {
      if (!pin) {
        setEmptyFields(true);

        return;
      }

      setEmptyFields(false);
    }
  }, [step, amount, pin, modal]);

  const previousStep = () => {
    if (isLoading) {
      return;
    }
    if (screenLoading?.status === true) {
      return;
    }
    if (step === 1) {
      closeModal();
      // scrollViewRef2.current?.scrollTo({ x: 0, y: 0, animated: true });

      return;
    }
    if (step === 2) {
      setStep(1);
      setButtonText("Proceed");
      scrollViewRef2.current?.scrollTo({ x: 0, y: 0, animated: true });
      return;
    }
    if (step === 3) {
      setStep(2);
      setButtonText("Proceed");
      scrollViewRef2.current?.scrollTo({ x: width, y: 0, animated: true });
      return;
    }
  };

  const procceed = () => {
    setEmptyFields(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (step === 1) {
        setStep(2);
        // setButtonText("Submit");
        scrollViewRef2.current?.scrollTo({ x: width, y: 0, animated: true });

        return;
      }
      if (step === 2) {
        setStep(3);
        setButtonText("Submit");
        scrollViewRef2.current?.scrollTo({ x: width * 2, y: 0, animated: true });
        // closeModal();
      }

      if (step === 3) {
        setScreenLoading({
          status: true,
          message: "please wait...",
        });

        setTimeout(() => {
          closeModal();

          setScreenLoading({
            status: false,
            message: "",
          });
        }, 4500);

        // closeModal();
      }
    }, 400);
  };

  return (
    <Modal
      visible={modal?.status}
      animationType="fade"
      onRequestClose={() => previousStep()}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScreenLoading visibility={screenLoading} />

      <KeyboardAvoidingView style={{ marginTop: -40, flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ height: screenHeight }}>
          <View style={[{ backgroundColor: colors.greenDarkColor, marginTop: 40 }]}>
            <View style={[styles.modalHeader]}>
              <Icon
                name="arrow-left"
                size={40}
                style={[styles.modalHeaderIcon, { color: "#fff" }]}
                onPress={() => previousStep()}
              />
              <Text style={styles.modalHeaderText}>Transfer to bank</Text>
            </View>

            <HeaderBalance />
          </View>

          <ScrollView
            horizontal={true}
            scrollEnabled={shouldScroll}
            ref={scrollViewRef2}
            style={{ padding: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            <FAmount amount={amount} setAmount={setAmount} bank={modal?.bank} />
            <FSummary summaryDetails={summaryDetails} />
            <FConfirm pin={pin} setPin={setPin} step={step} />
          </ScrollView>

          <View
            style={[
              globalStyles.buttonFloat,
              {
                width: "100%",
                justifyContent: "flex-end",
                marginBottom: -40,
                marginLeft: 0,
                padding: 0,
                marginRight: 0,
              },
            ]}
          >
            <CustomLoadingButton
              onPress={() => procceed()}
              emptyFields={emptyFields}
              buttonText={buttonText}
              loading={isLoading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    color: "#fff",
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

  modalSearch: {
    width: "98%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  searchIcon: {
    marginRight: 15,
  },

  searchInput: {
    fontSize: 16,
    color: "#444",
  },

  buttonFloat: {
    position: "absolute",
    right: 10,
    bottom: 120,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 80,
    elevation: 5,
  },

  buttonFloatText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    color: "#fff",
  },
});

export default TransferToBankModal;
