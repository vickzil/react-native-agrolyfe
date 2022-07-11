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
import { setAlertModal, setAlertModalSuccess, setMakeInvestmentModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import ScreenLoading from "../../loader/ScreenLoading";
import FAmount from "./makeinvestment/FAmount";
import FSummary from "./makeinvestment/FSummary";
import FConfirm from "./makeinvestment/FConfirm";

const { width } = Dimensions.get("screen");
const screenHeight = Dimensions.get("window").height;

const MakeInvestmentModal = () => {
  const modal = useSelector((state) => state.alert.makeInvestmentModal);

  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(null);
  const [duration, setDuration] = useState("");
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
  const scrollViewRef = useRef(null);

  const closeModal = () => {
    dispatch(
      setMakeInvestmentModal({
        status: false,
        payload: null,
      }),
    );

    setAmount(null);
    setDuration("");
    setSummaryDetails(null);
    setStep(1);
    setButtonText("Proceed");
    setEmptyFields(true);
    setScreenLoading({
      status: false,
      message: "",
    });
    setIsEnabled(false);
  };

  // useEffect(() => {
  //   if (modal?.payload) {
  //     setAmount(modal?.payload.minimumAmount);
  //   }
  // }, [modal]);

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

      if (modal?.payload) {
        if (modal?.payload?.frequencyDurations && modal?.payload?.frequencyDurations.length) {
          if (!duration) {
            setEmptyFields(true);
          }
        }
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
  }, [step, amount, isEnabled, modal]);

  const previousStep = () => {
    if (isLoading) {
      return;
    }
    if (screenLoading?.status === true) {
      return;
    }
    if (step === 1) {
      closeModal();
      // scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });

      return;
    }
    if (step === 2) {
      setStep(1);
      setButtonText("Proceed");
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      return;
    }
    if (step === 3) {
      setStep(2);
      setButtonText("Proceed");
      scrollViewRef.current?.scrollTo({ x: width, y: 0, animated: true });
      return;
    }
  };

  const procceed = () => {
    setEmptyFields(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (step === 1) {
        calculateInvestment();

        return;
      }
      if (step === 2) {
        setStep(3);
        scrollViewRef.current?.scrollTo({ x: width * 2, y: 0, animated: true });
        // closeModal();
      }

      if (step === 3) {
        makeInvestment();

        // closeModal();
      }
    }, 400);
  };

  const calculateInvestment = () => {
    setEmptyFields(true);
    setIsLoading(true);

    let newDuration;

    if (modal?.payload?.frequencyDurations.length > 0) {
      newDuration = duration;
    } else {
      newDuration = modal?.payload?.duration;
    }
    let newAmount = amount.replace(/[^a-zA-Z0-9]/g, "");

    let newPayload = {
      AppId: AppId,
      RequestId: RequestId,
      UserCode: user?.code,
      Code: modal?.payload?.code,
      Amount: newAmount,
      NumberOfDurationInWeeks: newDuration,
      DurationOfInvestment: newDuration,
      IamInterestedInOilvest: false,
    };

    // console.log(newPayload);

    axios
      .post(`${baseURL}/v1.0/AvailableInvestment/CalculateROI`, newPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          // console.log(response?.data?.data);
          setIsLoading(false);
          setEmptyFields(false);
          setSummaryDetails(response?.data?.data);
          setStep(2);
          // setButtonText("Submit");
          scrollViewRef.current?.scrollTo({ x: width, y: 0, animated: true });
        } else {
          setIsLoading(false);
          setSummaryDetails(null);
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

  const makeInvestment = () => {
    setEmptyFields(true);
    setScreenLoading({
      status: true,
      message: "Initiating Purchase...",
    });

    let newDuration;

    if (duration !== "") {
      newDuration = duration;
    } else {
      newDuration = modal.payload.duration;
    }
    let newAmount = amount.replace(/[^a-zA-Z0-9]/g, "");

    axios
      .post(
        `${baseURL}/v1.0/UserInvestment/insertUserInvestments`,
        {
          AppId: AppId,
          RequestId: RequestId,
          Email: user?.email,
          UserCode: user?.code,
          AvailableInvestmentCode: modal.payload.code,
          AmountInvested: newAmount,
          Duration: newDuration,
          UpfrontPaidUponInvestment: false,
          SourceChannel: "online",
          ReturnsToOilVest: false,
          Frequency: modal?.payload?.frequency,
          GroupSubsidiaryCode: user?.subsidiaryCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
          },
        },
      )
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          dispatch(
            setAlertModalSuccess({
              status: true,
              payload: {
                amount: newAmount,
                message:
                  "Your Purchase of NGN " + addComma(newAmount) + " on " + modal?.payload?.name + " Was successfull",
              },
            }),
          );
          closeModal();

          setScreenLoading({
            status: false,
            message: "",
          });
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
          <View style={[styles.modalHeader, { backgroundColor: "#fff", marginTop: 40, paddingBottom: 0 }]}>
            <Icon
              name="arrow-left"
              size={40}
              style={[styles.modalHeaderIcon, { color: "#222" }]}
              onPress={() => previousStep()}
            />
            <Text style={[styles.modalHeaderText, { color: "#333" }]}>Purchase Farm land</Text>
          </View>

          <ScrollView
            horizontal={true}
            scrollEnabled={shouldScroll}
            ref={scrollViewRef}
            style={{ padding: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            <FAmount
              payload={modal?.payload}
              amount={amount}
              setAmount={setAmount}
              setDuration={setDuration}
              duration={duration}
            />
            <FSummary payload={modal?.payload} summaryDetails={summaryDetails} />
            <FConfirm payload={modal?.payload} isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
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
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "PoppinsBold",
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

export default MakeInvestmentModal;
