import {
  Dimensions,
  FlatList,
  Keyboard,
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
import { setAlertModal, setPaymentEvidenceModal } from "../../../store/alert/alertSlice";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInputMask } from "react-native-masked-text";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import ScreenLoading from "../../loader/ScreenLoading";
import POPUpModal from "../POPUpModal";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcons from "react-native-vector-icons/Feather";
import axios from "axios";
import { getUserInfo } from "../../../store/auth/actions";
import SvgComponent from "../../customs/SvgComponent";
import AnimatedViewComp from "../../customs/AnimatedViewComp";

const { width } = Dimensions.get("screen");
const screenHeight = Dimensions.get("window").height;

const UploadPaymentEvidence = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.paymentEvidenceModal);
  const walletOptions = useSelector((state) => state.wallet.walletOptions);

  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.walletURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [buttonText, setButtonText] = useState("Submit");
  const [emptyFields, setEmptyFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState({
    status: false,
    message: "",
  });
  const [showCModal, setShowCModal] = useState(false);

  const [shouldScroll] = useState(false);
  const scrollViewRef = useRef(null);

  const closeModal = () => {
    dispatch(setPaymentEvidenceModal(false));

    setUploadedImage(null);
    setAmount(null);
    setCurrency("");
    setAdditionalInfo("");
    setButtonText("Submit");
    setEmptyFields(true);
    setScreenLoading({
      status: false,
      message: "",
    });
  };

  useEffect(() => {
    if (!amount) {
      setEmptyFields(true);

      return;
    }

    if (!currency) {
      setEmptyFields(true);

      return;
    }

    if (!uploadedImage) {
      setEmptyFields(true);

      return;
    }

    setEmptyFields(false);
  }, [amount, currency, uploadedImage, additionalInfo]);

  const previousStep = () => {
    if (isLoading) {
      return;
    }
    if (screenLoading?.status === true) {
      return;
    }
    closeModal();
  };

  const handleLoading = (status) => {
    Keyboard.dismiss();
    setScreenLoading({
      status: status,
      message: "Please wait...",
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setUploadedImage(result);
    }
  };

  const submitForm = () => {
    handleLoading(true);

    let fd = new FormData();
    let newAmount = amount.replace(/[^a-zA-Z0-9]/g, "");

    fd.append("Evidence", {
      uri: uploadedImage?.uri,
      type: "image/jpg",
      name: "image-agrolyfe" + new Date() + ".jpg",
      size: 74715,
      webkitRelativePath: "",
      lastModified: Date.now(),
      lastModifiedDate: new Date(),
    });
    fd.append("AppId", AppId);
    fd.append("RequestId", RequestId);
    fd.append("UserCode", user?.code);
    fd.append("Email", user?.email);
    fd.append("Currency", currency?.code);
    fd.append("Amount", newAmount);
    fd.append("AdditionalInformation", additionalInfo);

    axios
      .post(`${baseURL}/v1.0/PaymentEvidence/sendpaymentEvidence`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          handleLoading(false);

          dispatch(
            setAlertModal({
              status: true,
              type: "SUCCESS",
              title: "Payment Evidence Submitted",
              des: response.data.message,
              payload: null,
            }),
          );

          dispatch(getUserInfo(user?.code));

          previousStep();
        } else {
          handleLoading(false);

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
        handleLoading(false);

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
      {modal && (
        <View>
          <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
        </View>
      )}
      <ScreenLoading visibility={screenLoading} />
      <POPUpModal visible={showCModal} setVisible={setShowCModal} modalTitle=" Currencies" lightBackground={true}>
        <View>
          {walletOptions?.currencies?.map((item, index) => (
            <AnimatedViewComp index={index} key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[globalStyles.selectContainer, currency == item ? globalStyles.selectedItem : null]}
                onPress={() => {
                  setShowCModal(false);
                  setCurrency(item);
                }}
              >
                <View animation={"fadeInLeft"} duration={1000} delay={index * 3} style={globalStyles.selectContent}>
                  <Text style={[globalStyles.selectContentText, globalStyles.selectContentText1]}>{item?.name}</Text>
                </View>
              </TouchableOpacity>
            </AnimatedViewComp>
          ))}
        </View>
      </POPUpModal>

      <KeyboardAvoidingView style={{ marginTop: -40, flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ height: screenHeight }}>
          <SvgComponent />
          <View style={[styles.modalHeader, { backgroundColor: "#fff", marginTop: 30 }]}>
            <Icon
              name="arrow-left"
              size={40}
              style={[styles.modalHeaderIcon, { color: "#111" }]}
              onPress={() => previousStep()}
            />
            <Text style={[styles.modalHeaderText, { fontWeight: "600", fontFamily: "PoppinsBold" }]}>
              Upload payment Evidence
            </Text>
          </View>

          <ScrollView
            horizontal={true}
            scrollEnabled={shouldScroll}
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ width: width, flex: 1, alignItems: "center" }}>
              <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 12, width: "100%", paddingBottom: 20 }}
              >
                <View style={[globalStyles.productCardContent, { marginBottom: 0, width: "100%" }]}>
                  <View style={{ marginTop: 10, marginBottom: 20, width: "100%" }}>
                    <Text
                      style={[styles.productCardContentItemLeft, { fontSize: 14, marginBottom: 5, fontWeight: "600" }]}
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
                      value={amount}
                      onChangeText={(text) => {
                        setAmount(text);
                      }}
                      style={[
                        globalStyles.inputTextt,
                        globalStyles.inputContainer,
                        { fontSize: 33, fontWeight: "800" },
                      ]}
                    />
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <Text
                      style={[styles.productCardContentItemLeft, { fontSize: 14, marginBottom: 5, fontWeight: "600" }]}
                    >
                      Currency
                    </Text>

                    <TouchableOpacity style={[globalStyles.inputContainer]} onPress={() => setShowCModal(true)}>
                      <TextInput value={currency?.name} editable={false} style={globalStyles.inputTextt} />
                      <FontAwesome5Icon name="chevron-circle-down" size={16} color="#666" style={{ marginRight: 10 }} />
                    </TouchableOpacity>

                    {/* <Dropdown
                  style={styles.dropdown}
                  containerStyle={styles.shadow}
                  data={[
                    "NAIRA (NGN)",
                    "US DOLLAR (USD)",
                    "EURO (EUR)",
                    "UGANDA SHILLING (UGX)",
                    "GREAT BRITISH POUNDS (GBP)",
                    "GHANA CEDIS (GHS)",
                    "RWANDA FRANCE (RWF)",
                  ]}
                  labelField="label"
                  valueField={currency}
                  label="Dropdown"
                  placeholder="Select Currency"
                  value={currency}
                  onChange={(item) => {
                    setCurrency(item);
                    console.log("selected", item);
                  }}
                  // renderLeftIcon={() => <Image style={styles.icon} source={require("./assets/account.png")} />}
                  renderItem={(item) => _renderItem(item)}
                  textError="Error"
                /> */}
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <Text
                      style={[styles.productCardContentItemLeft, { fontSize: 14, marginBottom: 5, fontWeight: "600" }]}
                    >
                      Additional information
                    </Text>
                    <View style={[globalStyles.inputContainer, { height: 70 }]}>
                      <TextInput
                        value={additionalInfo}
                        onChangeText={(text) => setAdditionalInfo(text)}
                        autoCorrect={false}
                        style={globalStyles.inputTextt}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 80 }}>
                    <Text
                      style={[styles.productCardContentItemLeft, { fontSize: 14, marginBottom: 5, fontWeight: "600" }]}
                    >
                      Upload Evidience of Payment
                    </Text>

                    <TouchableOpacity
                      onPress={() => pickImage()}
                      style={[
                        globalStyles.inputContainer,
                        {
                          height: 120,
                          flexDirection: "column",
                          borderWidth: 0,
                          backgroundColor: "#f1f1f1",
                          justifyContent: "center",
                          marginTop: 15,
                        },
                      ]}
                    >
                      {uploadedImage ? (
                        <>
                          <FeatherIcons name="image" size={31} style={[{ color: "#444", padding: 2 }]} />
                          <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 10, color: "#555" }}>
                            {uploadedImage?.uri.substring(
                              uploadedImage?.uri.length,
                              uploadedImage?.uri.lastIndexOf("/"),
                            )}
                          </Text>
                        </>
                      ) : (
                        <>
                          <FeatherIcons name="upload-cloud" size={31} style={[{ color: "#444", padding: 2 }]} />
                          <Text style={{ fontSize: 19, fontWeight: "700", marginTop: 10, color: "#555" }}>
                            Upload photo
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
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
              onPress={() => submitForm()}
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
    color: "#222",
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

  productCardContentItemLeft: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginRight: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});

export default UploadPaymentEvidence;
