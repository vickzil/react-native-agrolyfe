import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  setAlertModal,
  setAlertModalSuccess,
  setMySavingsDetailsModal,
  setMySavingsModal,
  setSelectCardModal,
  setSelectedCard,
  setTopUpSavingsModal,
} from "../../../store/alert/alertSlice";
import { globalStyles } from "../../../styles/global";
import { TextInputMask } from "react-native-masked-text";
import colors from "../../../styles/colors";
import axios from "axios";
import Modal from "react-native-modal";
import ScreenLoading from "../../loader/ScreenLoading";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import { addComma } from "../../helpers/globalFunction";
import { otherGlobalFunctions } from "../../../store/utilities/actions";
import { getUserInfo } from "../../../store/auth/actions";
const { width, height } = Dimensions.get("window");
let screenHeight = Dimensions.get("window").height;

const TopUpSavingsModal = () => {
  const dispatch = useDispatch();

  const scrollViewRef = useRef(null);

  const modal = useSelector((state) => state.alert.topUpSavingsModal);
  const selectedCard = useSelector((state) => state.alert.selectedCard);
  const walletOptions = useSelector((state) => state.wallet.walletOptions);

  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const [cards, setCards] = useState([]);
  const [emptyFields, setEmptyFields] = useState(false);
  const [amount, setAmount] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [screenLoading, setScreenLoading] = useState({
    status: false,
    message: "Please wait...",
  });

  useEffect(() => {
    if (walletOptions) {
      setCards(walletOptions?.bySavedCards);
      if (walletOptions?.bySavedCards?.length) {
        let selectedCardForPayment = walletOptions?.bySavedCards.find(
          (item) => item.code === modal?.payload?.paymentMethodCode,
        );
        if (selectedCardForPayment) {
          dispatch(setSelectedCard(selectedCardForPayment));
        }
      }
    }
  }, [walletOptions]);

  useEffect(() => {
    if (modal?.payload) {
      setAmount(modal?.payload?.paymentAmountPerFrequency);
    }
  }, [modal]);

  const closeModal = () => {
    dispatch(
      setTopUpSavingsModal({
        status: false,
        payload: null,
      }),
    );
  };

  useEffect(() => {
    if (!amount) {
      setEmptyFields(true);

      return;
    }

    if (selectedCard === null) {
      setEmptyFields(true);

      return;
    }

    if (!isEnabled) {
      setEmptyFields(true);

      return;
    }

    setEmptyFields(false);
  }, [amount, selectedCard, isEnabled]);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const topUpSavingsWallet = () => {
    setEmptyFields(true);

    setScreenLoading({
      status: true,
      message: "Initiating Request...",
    });

    let newPayload = {
      AppId: AppId,
      RequestId: RequestId,
      UserCode: user?.code,
      Amount: modal?.payload?.paymentAmountPerFrequency,
      UserSavingsCode: modal?.payload?.code,
      PaymentMethod: "card",
      UserCardCode: modal?.payload?.paymentMethodCode,
      UseCardForAllSavings: true,
    };

    // console.log(newPayload);

    axios
      .post(`${baseURL}/v1.0/UserSavings/topupUserSavingsBySavedCard`, newPayload, {
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
                amount: amount,
                message: "Top-up savings of NGN " + addComma(amount) + " Was successful ",
              },
            }),
          );

          dispatch(getUserInfo(user?.code));
          dispatch(otherGlobalFunctions());

          dispatch(
            setMySavingsDetailsModal({
              status: false,
              payload: null,
            }),
          );

          dispatch(setMySavingsModal(false));

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
      isVisible={modal?.status}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={100}
      onBackButtonPress={() => closeModal()}
      onBackdropPress={() => closeModal()}
      onSwipeComplete={() => closeModal()}
      // swipeDirection="right"
      style={{ width: width, height: screenHeight, margin: 0, padding: 0, backgroundColor: "#fff" }}
    >
      <ScreenLoading visibility={screenLoading} />

      <KeyboardAvoidingView style={{ marginTop: 0, flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ height: screenHeight }}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="arrow-left"
              size={33}
              style={[styles.modalHeaderIcon, { color: "#111" }]}
              onPress={() => closeModal()}
            />
            <Text style={styles.modalHeaderText}>Top up Savings</Text>
            <Text></Text>
          </View>
          <ScrollView
            horizontal={true}
            scrollEnabled={false}
            ref={scrollViewRef}
            style={{ padding: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            <View style={[styles.productContainer]}>
              <View style={{ marginTop: 60, marginBottom: 10, width: "95%", paddingRight: 10 }}>
                <View>
                  <View style={{ marginTop: 20, marginBottom: 60, alignItems: "center" }}>
                    <Text
                      style={[
                        styles.productCardContentItemLeft,
                        {
                          fontSize: 16,
                          marginBottom: 20,
                          fontWeight: "600",
                          fontFamily: "Montserrat",
                          letterSpacing: -0.35644,
                          color: colors.greenDarkDarkColor,
                        },
                      ]}
                    >
                      Amount
                    </Text>

                    <TextInputMask
                      type={"money"}
                      autoFocus={true}
                      options={{
                        precision: 0,
                        //   separator: ",",
                        delimiter: ",",
                        unit: "₦",
                        suffixUnit: "",
                      }}
                      placeholder="0"
                      editable={false}
                      value={amount}
                      onChangeText={(text) => {
                        setAmount(text);
                      }}
                      style={[
                        {
                          width: "80%",
                          height: 55,
                          // backgroundColor: "#fff",
                          flexDirection: "row",
                          paddingHorizontal: 15,
                          borderBottomWidth: 2,
                          borderColor: "#cccf",
                          alignItems: "center",
                          borderRadius: 8,
                          fontSize: 33,
                          fontWeight: "700",
                          textAlign: "center",
                        },
                      ]}
                    />
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={[
                      styles.productCardContentItemLeft,
                      {
                        fontSize: 16,
                        marginBottom: 15,
                        fontWeight: "600",
                        color: colors.greenDarkDarkColor,
                        fontFamily: "Montserrat",
                        letterSpacing: -0.35644,
                      },
                    ]}
                  >
                    Payment Type
                  </Text>
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
                            type: "TOPUP_BY_CARD",
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
                              { fontWeight: "600", color: colors.greenColor, fontSize: 16 },
                            ]}
                          >
                            {selectedCard ? selectedCard?.cardBankName : "Select card"}{" "}
                            {selectedCard ? " - " + selectedCard?.cardLast4 : null}
                          </Text>
                          {selectedCard ? (
                            <Text
                              style={[
                                styles.productCardContentItemRight,
                                { fontWeight: "600", color: colors.greenColor, fontSize: 15 },
                              ]}
                            >
                              switch card
                            </Text>
                          ) : null}
                        </View>

                        <Icon
                          name="chevron-right"
                          size={53}
                          style={[styles.modalHeaderIcon, { color: colors.greenColor, fontSize: 23, marginRight: 0 }]}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ marginTop: 0, flexDirection: "row", alignItems: "center", width: "90%" }}>
                  <Switch
                    trackColor={{ false: "#767577", true: colors.greenLightColor }}
                    thumbColor={isEnabled ? colors.greenColor : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ textAlign: "left", transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  />

                  <Text
                    style={[
                      { fontSize: 15, textAlign: "left", paddingHorizontal: 10, color: "#aaa" },
                      isEnabled && { color: "#222" },
                    ]}
                  >
                    I agree to be debited ₦{amount ? addComma(amount) : 0} immediately from my{" "}
                    {selectedCard?.cardBankName} card
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={[
              globalStyles.buttonFloat,
              {
                position: "relative",

                width: "100%",
                justifyContent: "flex-end",
                marginBottom: 40,
                marginLeft: 0,
                padding: 0,
                marginRight: 0,
              },
            ]}
          >
            <CustomLoadingButton
              onPress={() => topUpSavingsWallet()}
              emptyFields={emptyFields}
              buttonText={"Top up"}
              loading={false}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
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

  modalBackground: {
    width,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "94%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingBottom: 20,
    borderRadius: 20,
    elevation: 10,
  },

  header: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "PoppinsBold",
    letterSpacing: -0.35644,
    color: "#333",
    marginLeft: -45,
  },

  Icon: {
    color: colors.greenColor,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
  },

  productContainer: {
    width,
    height,
    flex: 1,
    alignItems: "center",
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
export default TopUpSavingsModal;
