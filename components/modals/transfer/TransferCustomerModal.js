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
import {
  setAlertModal,
  setAlertModalSuccess,
  setSubCategorySavingsModal,
  setTransferToCustomerModal,
} from "../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import ScreenLoading from "../../loader/ScreenLoading";
import FName from "./toCustomer/FName";
import FAmount from "./toCustomer/FAmount";
import FSummary from "./toCustomer/FSummary";
import FConfirm from "./toCustomer/FConfirm";
import { removeAtFromString } from "../../helpers/globalFunction";
import { addComma } from "../../helpers/globalFunction";
import { getUserInfo } from "../../../store/auth/actions";
import { getUserWalletBalance } from "../../../store/wallet/actions";
import { getTransactionsInfo } from "../../../store/transactions/actions";
import SvgComponent from "../../customs/SvgComponent";
import { otherGlobalFunctions } from "../../../store/utilities/actions";

const { width } = Dimensions.get("screen");
const screenHeight = Dimensions.get("window").height;

const TransferCustomerModal = () => {
  const modal = useSelector((state) => state.alert.transferToCustomerModal);
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(null);
  const [userName, setUserName] = useState("");
  const [calculatedUser, setCalculatedUser] = useState(null);
  const [summaryDetails, setSummaryDetails] = useState(null);
  const [pin, setPin] = useState(null);
  const [buttonText, setButtonText] = useState("Search User");
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
      setTransferToCustomerModal({
        status: false,
        user: null,
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
    setPin(null);
    setCalculatedUser(null);
    setUserName("");
  };

  useEffect(() => {
    if (step === 1) {
      if (!userName) {
        setEmptyFields(true);

        return;
      }

      setEmptyFields(false);
    }
    if (step === 2) {
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

    if (step === 3) {
      setEmptyFields(false);
    }

    if (step === 4) {
      if (!pin) {
        setEmptyFields(true);

        return;
      }

      setEmptyFields(false);
    }
  }, [step, amount, pin, modal, userName]);

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
      setButtonText("Continue");
      scrollViewRef2.current?.scrollTo({ x: 0, y: 0, animated: true });
      return;
    }
    if (step === 3) {
      setStep(2);
      setButtonText("Continue");
      scrollViewRef2.current?.scrollTo({ x: width, y: 0, animated: true });
      return;
    }
    if (step === 4) {
      setStep(3);
      setButtonText("Continue");
      scrollViewRef2.current?.scrollTo({ x: width * 2, y: 0, animated: true });
      return;
    }
  };

  const procceed = () => {
    setEmptyFields(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (step === 1) {
        searchUser();
        return;
      }
      if (step === 2) {
        setStep(3);

        scrollViewRef2.current?.scrollTo({ x: width * 2, y: 0, animated: true });
        // closeModal();
      }
      if (step === 3) {
        setStep(4);
        setButtonText("Submit");
        scrollViewRef2.current?.scrollTo({ x: width * 3, y: 0, animated: true });
        // closeModal();
      }

      if (step === 4) {
        initiateTransfer();

        // closeModal();
      }
    }, 400);
  };

  const removeUser = () => {
    setEmptyFields(true);
    setIsLoading(true);

    setTimeout(() => {
      setUserName("");
      setButtonText("Search");
      setIsLoading(false);
      setCalculatedUser(null);
    }, 500);
  };

  const searchUser = () => {
    setEmptyFields(true);
    setIsLoading(true);
    let inputUserName = removeAtFromString(userName).trim();

    let newPayload = {
      AppId: AppId,
      RequestId: RequestId,
      UserName: inputUserName.toLowerCase(),
    };

    // console.log(newPayload);

    axios
      .post(`${baseURL}/v1.0/User/getUserInfoByUserName`, newPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        if (response?.data?.success == true) {
          setEmptyFields(false);
          setCalculatedUser(response?.data?.data);
          setIsLoading(false);
          setButtonText("Continue");

          setStep(2);
          scrollViewRef2.current?.scrollTo({ x: width, y: 0, animated: true });
        } else {
          setButtonText("Search");
          setIsLoading(false);
          setCalculatedUser(null);
          setEmptyFields(false);

          dispatch(
            setAlertModal({
              status: true,
              type: "error",
              title: " Error",
              des: response.data.message,
              payload: null,
            }),
          );
        }
      })
      .catch(() => {
        setIsLoading(false);
        setButtonText("Search");

        dispatch(
          setAlertModal({
            status: true,
            type: "error",
            title: "Service Error",
            des: "Service is temporarily unavailable. Please try again in a few minutes.",
            payload: null,
          }),
        );
      });
  };

  const initiateTransfer = () => {
    setEmptyFields(true);
    setScreenLoading({
      status: true,
      message: "Initiating transfer...",
    });

    let newAmount = amount.replace(/[^a-zA-Z0-9]/g, "");

    let newPayload = {
      AppId: AppId,
      RequestId: RequestId,
      UserCode: user?.code,
      Amount: newAmount,
      PIN: pin,
      DebitUserCode: user?.code,
      CreditUserCode: calculatedUser?.code,
      Narration: "",
      AdditionalInfo: "",
    };

    // console.log(newPayload);

    axios
      .post(`${baseURL}/v1.0/Withdrawal/fundsTransfer`, newPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        // console.log(response?.data);
        closeModal();

        if (response?.data?.success == true) {
          // console.log(response?.data?.data);
          setScreenLoading({
            status: false,
            message: "",
          });
          dispatch(
            setAlertModalSuccess({
              status: true,
              payload: {
                amount: newAmount,
                message:
                  "Transfer of NGN " + addComma(newAmount) + " to " + calculatedUser?.firstName + " Was successfull",
              },
            }),
          );

          dispatch(getUserInfo(user?.code));
          dispatch(otherGlobalFunctions());
        } else {
          setEmptyFields(false);
          setScreenLoading({
            status: false,
            message: "",
          });

          dispatch(
            setAlertModal({
              status: true,
              type: "error",
              title: " Error",
              des: response.data.message,
              payload: null,
            }),
          );
        }
      })
      .catch(() => {
        setScreenLoading({
          status: false,
          message: "",
        });

        dispatch(
          setAlertModal({
            status: true,
            type: "error",
            title: "Service Error",
            des: "Service is temporarily unavailable. Please try again in a few minutes.",
            payload: null,
          }),
        );
      });
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
          <SvgComponent />
          <View
            style={[
              {
                backgroundColor: "#fff",
                marginTop: 30,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              },
            ]}
          >
            <View style={[styles.modalHeader]}>
              <Icon
                name="arrow-left"
                size={40}
                style={[styles.modalHeaderIcon, { color: "#111" }]}
                onPress={() => previousStep()}
              />
              <Text style={[styles.modalHeaderText, { color: "#222", fontWeight: "600", fontFamily: "PoppinsBold" }]}>
                Transfer to {modal?.user?.firstName || "Customer"}
              </Text>
            </View>

            {/* <HeaderBalance /> */}
          </View>

          <ScrollView
            horizontal={true}
            scrollEnabled={shouldScroll}
            ref={scrollViewRef2}
            style={{ padding: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            <FName
              userName={userName}
              setUserName={setUserName}
              calculatedUser={calculatedUser}
              setCalculatedUser={setCalculatedUser}
              removeUser={removeUser}
            />
            <FAmount amount={amount} setAmount={setAmount} calculatedUser={calculatedUser} />
            <FSummary amount={amount} calculatedUser={calculatedUser} />
            <FConfirm pin={pin} setPin={setPin} step={step} calculatedUser={calculatedUser} />
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
    paddingVertical: 10,
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

export default TransferCustomerModal;
