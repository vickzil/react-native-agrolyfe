import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAlertModal, setFeedbackModal, setFeedbackPromptModal } from "../../../store/alert/alertSlice";
import { globalStyles } from "../../../styles/global";
import colors from "../../../styles/colors";
import axios from "axios";
import Modal from "react-native-modal";
import ScreenLoading from "../../loader/ScreenLoading";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import { addComma } from "../../helpers/globalFunction";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import CustomTextArea from "../../customs/CustomTextArea";
import POPUpModal from "../POPUpModal";
import { otherGlobalFunctions } from "../../../store/utilities/actions";
import { getUserInfo } from "../../../store/auth/actions";
import { setHasFeedBack } from "../../../store/auth/authSlice";
const { width, height } = Dimensions.get("window");
let screenHeight = Dimensions.get("window").height;

const FeedbackModal = () => {
  const dispatch = useDispatch();

  const scrollViewRef = useRef(null);

  const modal = useSelector((state) => state.alert.feedbackModal);

  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const [emptyFields, setEmptyFields] = useState(true);
  const [rating, setRating] = useState();
  const [description, setDescription] = useState("");
  const [feedbackType, setFeedbackType] = useState(null);
  const [screenLoading, setScreenLoading] = useState({
    status: false,
    message: "Please wait...",
  });

  const [showCModal, setShowCModal] = useState(false);

  const [allFeedbackType] = useState([
    {
      value: "fundwallet",
      name: "Fund Wallet",
    },
    {
      value: "investment",
      name: "Farm land purchase",
    },
    {
      value: "withdrawal",
      name: "Transfer",
    },
    {
      value: "saving",
      name: "Savings",
    },
  ]);

  const closeModal = () => {
    dispatch(setFeedbackModal(false));
    setFeedbackType(null);
    setDescription("");
    setRating();
    setEmptyFields(true);
  };

  useEffect(() => {
    if (!rating) {
      setEmptyFields(true);

      return;
    }

    if (feedbackType === null) {
      setEmptyFields(true);

      return;
    }

    setEmptyFields(false);
  }, [rating, feedbackType, description]);

  const submitFeedBack = () => {
    setEmptyFields(true);

    setScreenLoading({
      status: true,
      message: "Please wait...",
    });

    let newPayload = {
      AppId: AppId,
      RequestId: RequestId,
      UserCode: user?.code,
      Type: feedbackType?.value,
      Message: description,
      Rating: rating,
    };

    // console.log(newPayload);

    axios
      .post(`${baseURL}/v1.0/Feedback/submitFeedback`, newPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          // console.log(response?.data?.data);
          AsyncStorage.setItem("hasFeedBack", "true");
          dispatch(setHasFeedBack(true));
          setScreenLoading({
            status: false,
            message: "",
          });
          dispatch(
            setAlertModal({
              status: true,
              type: "SUCCESS",
              title: "Success",
              des: "Thank you for your feedback! we appreciate your response.",
              payload: null,
            }),
          );

          dispatch(getUserInfo(user?.code));
          dispatch(otherGlobalFunctions());

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
      isVisible={modal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={100}
      onBackButtonPress={() => closeModal()}
      onBackdropPress={() => closeModal()}
      onSwipeComplete={() => closeModal()}
      swipeDirection="right"
      style={{ width: width, height: screenHeight, margin: 0, padding: 0, backgroundColor: "#fff" }}
    >
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScreenLoading visibility={screenLoading} />
      <POPUpModal
        visible={showCModal}
        setVisible={setShowCModal}
        modalTitle=" Select feedback type"
        lightBackground={true}
      >
        <View>
          {allFeedbackType?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                globalStyles.selectContainer,
                feedbackType?.value == item.value ? globalStyles.selectedItem : null,
              ]}
              onPress={() => {
                setShowCModal(false);
                setFeedbackType(item);
              }}
            >
              <View style={globalStyles.selectContent} key={index}>
                <Text style={[globalStyles.selectContentText, globalStyles.selectContentText1]}>{item?.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </POPUpModal>

      <KeyboardAvoidingView style={{ marginTop: -30, flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ height: screenHeight }}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="arrow-left"
              size={33}
              style={[styles.modalHeaderIcon, { color: "#111" }]}
              onPress={() => closeModal()}
            />
            <Text style={styles.modalHeaderText}>Feedback</Text>
            <Text></Text>
          </View>
          <ScrollView
            horizontal={true}
            scrollEnabled={false}
            ref={scrollViewRef}
            style={{ padding: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              <View style={[styles.productContainer]}>
                <View style={{ marginTop: 10, marginBottom: 10, width: "95%", paddingRight: 10, paddingBottom: 180 }}>
                  <Text
                    style={[
                      {
                        fontSize: 20,
                        marginBottom: 20,
                        fontWeight: "600",
                        fontFamily: "Montserrat",
                        letterSpacing: -0.35644,
                        color: "#555",
                        textAlign: "center",
                      },
                    ]}
                  >
                    How was your experience?
                  </Text>
                  <View style={{ marginBottom: -10, marginTop: 10 }}>
                    <Text
                      style={[
                        {
                          fontSize: 17,
                          marginBottom: 20,
                          fontWeight: "600",
                          fontFamily: "PoppinsBold",
                          letterSpacing: -0.35644,
                          color: "#555",
                          textAlign: "center",
                        },
                      ]}
                    >
                      {rating === 5 && "Excellent"}
                      {rating === 4 && "Very Good"}
                      {rating === 3 && "Average"}
                      {rating === 2 && "Good"}
                      {rating === 1 && "Poor"}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <EntypoIcon
                      name="star"
                      size={40}
                      style={[
                        { marginHorizontal: 10 },
                        { color: ["1", "2", "3", "4", "5"].includes(String(rating)) ? "#ffa602" : "#777" },
                      ]}
                      onPress={() => setRating(1)}
                    />
                    <EntypoIcon
                      name="star"
                      size={40}
                      style={[
                        { marginHorizontal: 10 },
                        { color: ["2", "3", "4", "5"].includes(String(rating)) ? "#ffa602" : "#777" },
                      ]}
                      onPress={() => setRating(2)}
                    />
                    <EntypoIcon
                      name="star"
                      size={40}
                      style={[
                        { marginHorizontal: 10 },
                        { color: ["3", "4", "5"].includes(String(rating)) ? "#ffa602" : "#777" },
                      ]}
                      onPress={() => setRating(3)}
                    />
                    <EntypoIcon
                      name="star"
                      size={40}
                      style={[
                        { marginHorizontal: 10 },
                        { color: ["4", "5"].includes(String(rating)) ? "#ffa602" : "#777" },
                      ]}
                      onPress={() => setRating(4)}
                    />
                    <EntypoIcon
                      name="star"
                      size={40}
                      style={[{ marginHorizontal: 10 }, { color: ["5"].includes(String(rating)) ? "#ffa602" : "#777" }]}
                      onPress={() => setRating(5)}
                    />
                  </View>

                  <View style={{ marginTop: 60 }}>
                    <Text
                      style={[
                        {
                          fontSize: 19,
                          marginBottom: 20,
                          fontWeight: "600",
                          fontFamily: "Montserrat",
                          letterSpacing: -0.35644,
                          color: "#555",
                          textAlign: "center",
                        },
                      ]}
                    >
                      Type of feedback
                    </Text>

                    <TouchableOpacity
                      style={[globalStyles.inputContainer, { backgroundColor: "#f8f8f8", borderColor: "#ced4ed" }]}
                      onPress={() => setShowCModal(true)}
                    >
                      <TextInput value={feedbackType?.name} editable={false} style={globalStyles.inputTextt} />
                      <FontAwesome5Icon name="chevron-circle-down" size={16} color="#666" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 40 }}>
                    <View
                      style={{
                        backgroundColor: "#f8f8f8",
                        borderColor: "#ced4ed",
                        borderWidth: 1,
                        borderRadius: 10,
                        height: 180,
                      }}
                    >
                      <CustomTextArea
                        multiline
                        numberOfLines={7}
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        style={{
                          padding: 10,
                          paddingVertical: 10,
                          fontSize: 18,
                          height: "70%",
                          fontFamily: "Poppins",
                          letterSpacing: -0.35644,
                        }}
                        placeholder="Your feedback text here..."
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </ScrollView>
          <View
            style={[
              globalStyles.buttonFloat,
              {
                position: "relative",

                width: "100%",
                justifyContent: "flex-end",
                marginBottom: 0,
                marginLeft: 0,
                padding: 0,
                marginRight: 0,
              },
            ]}
          >
            <CustomLoadingButton
              onPress={() => submitFeedBack()}
              emptyFields={emptyFields}
              buttonText={"Submit"}
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
    paddingVertical: 7,
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
    height: "100%",
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

  isRated: {
    color: "#ffa602",
  },
});
export default FeedbackModal;
