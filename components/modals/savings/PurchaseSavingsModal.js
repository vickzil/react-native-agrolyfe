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
  setLoading,
  setMySavingsModal,
  setPurchaseSavingsModal,
  setSavingsModal,
  setSubCategorySavingsModal,
} from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import SavingsName from "./pruchase/SavingsName";
import SavingAmount from "./pruchase/SavingAmount";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import SavingFrequency from "./pruchase/SavingFrequency";
import SavingDuration from "./pruchase/SavingDuration";
import SavingSummary from "./pruchase/SavingSummary";
import ScreenLoading from "../../loader/ScreenLoading";
import { setSelectedSavingsType, setSelectedSavingsTypeDetails } from "../../../store/savings/savingsSlice";
import SvgComponent from "../../customs/SvgComponent";
import { addComma } from "../../helpers/globalFunction";
import { getUserInfo } from "../../../store/auth/actions";
import { otherGlobalFunctions } from "../../../store/utilities/actions";

const { width } = Dimensions.get("screen");
const screenHeight = Dimensions.get("window").height;

const PurchaseSavingsModal = () => {
  const modal = useSelector((state) => state.alert.purchaseSavingsModal);
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const paymentType = useSelector((state) => state.savings.selectedSavingsType);
  const paymentDetails = useSelector((state) => state.savings.selectedSavingsTypeDetails);

  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(null);
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [summaryDetails, setSummaryDetails] = useState(null);
  const [buttonText, setButtonText] = useState("Proceed");
  const [emptyFields, setEmptyFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState({
    status: false,
    message: "",
  });
  const [allFrequencies, setAllFrequencies] = useState([]);
  const [allDurations, setAllDurations] = useState([]);
  const [shouldScroll] = useState(false);

  const scrollViewRef = useRef(null);

  const closeModal = () => {
    dispatch(
      setPurchaseSavingsModal({
        status: false,
        payload: null,
      }),
    );

    setAmount(null);
    setName("");
    setFrequency("");
    setDuration("");
    setSummaryDetails(null);
    setStep(1);
    setButtonText("Proceed");
    setEmptyFields(true);
    setScreenLoading({
      status: false,
      message: "",
    });

    dispatch(setSelectedSavingsType(null));
    dispatch(setSelectedSavingsTypeDetails(null));
  };

  useEffect(() => {
    if (modal && modal.payload) {
      let parentCat = modal?.payload?.category;
      if (parentCat) {
        let formateFrequencies = modal?.payload?.category?.frequencies?.map((frequency) => {
          return {
            label: frequency.name,
            value: frequency.code,
          };
        });
        setAllFrequencies(formateFrequencies);
      }
    }
    if (modal && modal.payload) {
      let parentCat = modal?.payload?.category;
      if (parentCat) {
        let formateDuration = modal?.payload?.category?.durationInMonths?.map((frequency) => {
          return {
            label: frequency.name,
            value: frequency.code,
          };
        });
        setAllDurations(formateDuration);
      }
    }
  }, [modal]);

  useEffect(() => {
    if (step === 1) {
      if (!name) {
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
      // if (amount && amount < 100) {
      //   setEmptyFields(true);

      //   return;
      // }

      setEmptyFields(false);
    }
    if (step === 3) {
      if (!frequency) {
        setEmptyFields(true);

        return;
      }

      setEmptyFields(false);
    }
    if (step === 4) {
      if (!duration) {
        setEmptyFields(true);

        return;
      }

      setEmptyFields(false);
    }
    if (step === 5) {
      if (!paymentType) {
        setEmptyFields(true);

        return;
      }
      if (!paymentDetails) {
        setEmptyFields(true);

        return;
      }

      setEmptyFields(false);
    }
  }, [step, name, amount, frequency, duration, paymentDetails, paymentType]);

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
    if (step === 4) {
      setStep(3);
      setButtonText("Proceed");
      scrollViewRef.current?.scrollTo({ x: width * 2, y: 0, animated: true });
      return;
    }
    if (step === 5) {
      setStep(4);
      setButtonText("Proceed");
      scrollViewRef.current?.scrollTo({ x: width * 3, y: 0, animated: true });
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
        scrollViewRef.current?.scrollTo({ x: width, y: 0, animated: true });

        return;
      }
      if (step === 2) {
        setStep(3);
        scrollViewRef.current?.scrollTo({ x: width * 2, y: 0, animated: true });
        // closeModal();
      }
      if (step === 3) {
        setStep(4);
        scrollViewRef.current?.scrollTo({ x: width * 3, y: 0, animated: true });
        // closeModal();
      }
      if (step === 4) {
        // setStep(5);
        // scrollViewRef.current?.scrollTo({ x: width * 4, y: 0, animated: true });
        // setButtonText("Submit");

        getSummary();

        // here
      }

      if (step === 5) {
        initiateSavings();
      }
    }, 400);
  };

  const getSummary = () => {
    setEmptyFields(true);
    setScreenLoading({
      status: true,
      message: "Calculating...",
    });

    let newAmount = amount.replace(/[^a-zA-Z0-9]/g, "");

    let newPayload = {
      AppId: AppId,
      RequestId: RequestId,
      UserCode: user?.code,
      DurationInMonths: duration instanceof Date ? 0 : duration,
      Frequency: frequency,
      InstallmentAmount: newAmount,
      SavingsMainCategoryCode: modal?.payload?.subCat?.savingsMainCategoryCode,
      EndDate: duration instanceof Date ? duration : "",
    };

    // console.log(newPayload);

    axios
      .post(`${baseURL}/v1.0/UserSavings/getUserSavingsSummary`, newPayload, {
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
          setEmptyFields(false);
          setSummaryDetails(response?.data?.data);
          setStep(5);
          scrollViewRef.current?.scrollTo({ x: width * 4, y: 0, animated: true });
          setButtonText("Submit");
        } else {
          setScreenLoading({
            status: false,
            message: "",
          });
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

  const initiateSavings = () => {
    setEmptyFields(true);
    setScreenLoading({
      status: true,
      message: "Initiating Savings...",
    });

    let newAmount = amount.replace(/[^a-zA-Z0-9]/g, "");

    let newPayload = {
      AppId: AppId,
      RequestId: RequestId,
      UserCode: user?.code,
      DurationInMonths: duration instanceof Date ? 0 : duration,
      Frequency: frequency,
      SavingsAmount: newAmount,
      Allias: name,
      SavingsMainCategoryCode: modal?.payload?.subCat?.savingsMainCategoryCode,
      EndDate: duration instanceof Date ? duration : "",
      PaymentMethod: "card",
      PaymentMethodCode: paymentDetails?.code,
      SavingsCategoryCode: modal?.payload?.subCat?.code,
    };

    // console.log(newPayload);

    axios
      .post(`${baseURL}/v1.0/UserSavings/addUserSavingsBySavedCard`, newPayload, {
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
                  "Your savings of NGN " +
                  addComma(newAmount) +
                  " on " +
                  modal?.payload?.subCat?.name +
                  " Was successfull",
              },
            }),
          );
          dispatch(
            setSubCategorySavingsModal({
              status: false,
              payload: null,
            }),
          );

          dispatch(setSavingsModal(false));
          dispatch(setMySavingsModal(false));

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
      <View>
        <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
      </View>
      <ScreenLoading visibility={screenLoading} />
      {/* <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" /> */}
      {/* <StatusBar translucent barStyle={statusbar} /> */}
      <KeyboardAvoidingView style={{ marginTop: -40, flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ height: screenHeight }}>
          <SvgComponent />
          <View style={[styles.modalHeader, { backgroundColor: "#FFF", marginTop: 30, paddingBottom: 0 }]}>
            <Icon
              name="arrow-left"
              size={40}
              style={[styles.modalHeaderIcon, { color: "#111" }]}
              onPress={() => previousStep()}
            />
            <Text style={styles.modalHeaderText}></Text>
          </View>

          <ScrollView
            horizontal={true}
            scrollEnabled={shouldScroll}
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
          >
            <SavingsName
              payload={modal?.payload?.category}
              item={modal?.payload?.subCat}
              name={name}
              setName={setName}
            />
            <SavingAmount
              payload={modal?.payload?.category}
              item={modal?.payload?.subCat}
              amount={amount}
              setAmount={setAmount}
            />
            <SavingFrequency
              payload={modal?.payload?.category}
              item={modal?.payload?.subCat}
              frequency={frequency}
              setFrequency={setFrequency}
              allFrequencies={allFrequencies}
            />
            <SavingDuration
              payload={modal?.payload?.category}
              item={modal?.payload?.subCat}
              duration={duration}
              setDuration={setDuration}
              allDurations={allDurations}
            />
            <SavingSummary
              payload={modal?.payload?.category}
              item={modal?.payload?.subCat}
              paymentDetails={paymentDetails}
              paymentType={paymentType}
              summaryDetails={summaryDetails}
            />
          </ScrollView>

          <View
            style={[
              globalStyles.buttonFloat,
              {
                width: "100%",
                justifyContent: "flex-end",
                marginBottom: -30,
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

export default PurchaseSavingsModal;
