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
  setCableSubscriptionModal,
  setSelectedNetwork,
  setTransferToCustomerModal,
} from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import ScreenLoading from "../../loader/ScreenLoading";
import HeaderBalance from "../../extra/HeaderBalance";
import FirstScreen from "./cable/FirstScreen";
import FSummary from "./cable/FSummary";
import FConfirm from "./cable/FConfirm";
import { getUserWalletBalance } from "../../../store/wallet/actions";
import { getUserInfo } from "../../../store/auth/actions";
import { getTransactionsInfo } from "../../../store/transactions/actions";

const { width } = Dimensions.get("screen");
const screenHeight = Dimensions.get("window").height;

const CableSubscription = () => {
  const modal = useSelector((state) => state.alert.cableSubscriptionModal);
  const cableTvProviders = useSelector((state) => state.utility.cableTvProviders);

  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(3000);
  const [ICUNumber, setICUNumber] = useState("");
  const [summaryDetails, setSummaryDetails] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [buttonText, setButtonText] = useState("Proceed");
  const [emptyFields, setEmptyFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState({
    status: false,
    message: "",
  });
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shouldScroll] = useState(false);
  const scrollViewRef2 = useRef(null);

  useEffect(() => {
    if (selectedPackage && selectedProduct) {
      setAmount(selectedProduct?.amount);
    }
  }, [selectedProduct, selectedPackage]);

  const closeModal = () => {
    dispatch(setCableSubscriptionModal(false));

    setAmount(null);
    setICUNumber("");
    setSummaryDetails(null);
    setSelectedPackage(null);
    setSelectedProduct(null);
    setStep(1);
    setButtonText("Proceed");
    setEmptyFields(true);
    setScreenLoading({
      status: false,
      message: "",
    });
    setIsEnabled(false);
    dispatch(setSelectedNetwork(null));
  };

  useEffect(() => {
    // console.log(selectedPackage);
    // console.log(selectedProduct);
    // console.log(ICUNumber);
    if (step === 1) {
      if (!selectedPackage) {
        setEmptyFields(true);

        return;
      }
      if (!selectedProduct) {
        setEmptyFields(true);

        return;
      }

      if (!ICUNumber) {
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
  }, [step, selectedPackage, ICUNumber, isEnabled, modal, selectedProduct]);

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
      setIsEnabled(false);
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
        buyCableSub();
      }
    }, 400);
  };

  const buyCableSub = () => {
    setEmptyFields(true);

    setScreenLoading({
      status: true,
      message: "Initiating Request...",
    });

    let newAmount = amount;

    let newPayload = {
      AppId: AppId,
      RequestId: RequestId,
      UserCode: user?.code,
      Amount: newAmount,
      Code: selectedProduct.code,
      Phone: "",
      ServiceID: selectedPackage.serviceId,
      SmartCardNumber: ICUNumber,
    };

    axios
      .post(`${baseURL}/v1.0/UtilityPayment/buyCableTV`, newPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          console.log(response?.data?.data);
          setScreenLoading({
            status: false,
            message: "",
          });
          dispatch(
            setAlertModalSuccess({
              status: true,
              payload: {
                amount: newAmount,
                message: `Purchase of ${selectedProduct.name} at ${addComma(newAmount)} Was successful`,
              },
            }),
          );

          dispatch(getUserWalletBalance(user?.code));
          dispatch(getUserInfo(user?.code));
          dispatch(getTransactionsInfo(user?.code));

          closeModal();
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
      visible={modal}
      animationType="fade"
      onRequestClose={() => previousStep()}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScreenLoading visibility={screenLoading} />

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ height: screenHeight }}>
          <View
            style={[
              {
                backgroundColor: colors.greenDarkColor,
                marginTop: -10,
                // borderBottomLeftRadius: 5,
                // borderBottomRightRadius: 5,
              },
            ]}
          >
            <View style={[styles.modalHeader]}>
              <Icon
                name="arrow-left"
                size={40}
                style={[styles.modalHeaderIcon, { color: "#fff" }]}
                onPress={() => previousStep()}
              />
              <Text style={styles.modalHeaderText}>Cable subscription</Text>
            </View>

            <HeaderBalance />
          </View>

          <ScrollView
            horizontal={true}
            scrollEnabled={shouldScroll}
            ref={scrollViewRef2}
            showsHorizontalScrollIndicator={false}
          >
            <FirstScreen
              amount={amount}
              setAmount={setAmount}
              setICUNumber={setICUNumber}
              ICUNumber={ICUNumber}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
              cableTvProviders={cableTvProviders}
            />
            <FSummary
              amount={amount}
              ICUNumber={ICUNumber}
              selectedPackage={selectedPackage}
              selectedProduct={selectedProduct}
              summaryDetails={summaryDetails}
            />
            <FConfirm isEnabled={isEnabled} setIsEnabled={setIsEnabled} step={step} />
          </ScrollView>

          <View
            style={[
              globalStyles.buttonFloat,
              {
                width: "100%",
                justifyContent: "flex-end",
                marginBottom: 0,
                marginLeft: 0,
                padding: 0,
                marginRight: 0,
                paddingHorizontal: 10,
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

export default CableSubscription;
