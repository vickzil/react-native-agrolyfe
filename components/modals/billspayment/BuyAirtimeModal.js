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
  setBuyAirtimeModalModal,
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
import FirstScreen from "./airtime/FirstScreen";
import FSummary from "./airtime/FSummary";
import FConfirm from "./airtime/FConfirm";
import { getUserWalletBalance } from "../../../store/wallet/actions";
import { getUserInfo } from "../../../store/auth/actions";
import { getTransactionsInfo } from "../../../store/transactions/actions";
import { addComma } from "../../helpers/globalFunction";
import SvgComponent2 from "../../customs/SvgComponent2";
import { otherGlobalFunctions } from "../../../store/utilities/actions";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import { setRefreshing } from "../../../store/auth/authSlice";

const { width } = Dimensions.get("screen");
const screenHeight = Dimensions.get("window").height;

const BuyAirtimeModal = () => {
  const modal = useSelector((state) => state.alert.buyAirtimeModal);
  const airtimeDataProviders = useSelector((state) => state.utility.airtimeDataProviders);
  const selectedNetwork = useSelector((state) => state.alert.selectedNetwork);

  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);
  const theme = useSelector((state) => state.oauth.theme);

  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [summaryDetails, setSummaryDetails] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
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
    dispatch(setBuyAirtimeModalModal(false));

    setAmount(null);
    setMobileNumber("");
    setSummaryDetails(null);
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
    if (step === 1) {
      if (!selectedNetwork) {
        setEmptyFields(true);

        return;
      }

      if (!mobileNumber) {
        setEmptyFields(true);

        return;
      }

      if (!amount) {
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
  }, [step, amount, mobileNumber, isEnabled, modal, selectedNetwork]);

  const previousStep = () => {
    // setScreenLoading({
    //   status: false,
    //   message: "",
    // });
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
        buyAirtime();

        // closeModal();
      }
    }, 400);
  };

  const buyAirtime = () => {
    setEmptyFields(true);

    setScreenLoading({
      status: true,
      message: "Initiating Request...",
    });

    let newAmount = amount.replace(/[^a-zA-Z0-9]/g, "");

    let newPayload = {
      AppId: AppId,
      RequestId: RequestId,
      UserCode: user?.code,
      Amount: newAmount,
      PhoneNumber: mobileNumber,
      NetworkID: selectedNetwork?.code,
    };

    console.log(newPayload);

    axios
      .post(`${baseURL}/v1.0/UtilityPayment/buyAirtime`, newPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        // console.log(response?.data);

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
                message: "Your airtime purchase of NGN " + addComma(newAmount) + " Was successful",
              },
            }),
          );

          dispatch(getUserInfo(user?.code));
          dispatch(setRefreshing(true));

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

          closeModal();
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
        style={[
          {
            flex: 1,
            marginTop: 0,
          },
          theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ height: screenHeight }}>
          <SvgComponent2 />
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
              <Text style={[styles.modalHeaderText, { fontWeight: "600", fontFamily: "PoppinsBold" }]}>
                Buy Airtime
              </Text>
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
              setMobileNumber={setMobileNumber}
              mobileNumber={mobileNumber}
              selectedNetwork={selectedNetwork}
              airtimeDataProviders={airtimeDataProviders}
              theme={theme}
            />
            <FSummary
              amount={amount}
              mobileNumber={mobileNumber}
              selectedNetwork={selectedNetwork}
              summaryDetails={summaryDetails}
              theme={theme}
            />
            <FConfirm isEnabled={isEnabled} setIsEnabled={setIsEnabled} step={step} theme={theme} />
          </ScrollView>

          <View
            style={[
              globalStyles.buttonFloat,
              {
                width: "100%",
                // justifyContent: "flex-end",
                marginBottom: 20,
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

export default BuyAirtimeModal;
