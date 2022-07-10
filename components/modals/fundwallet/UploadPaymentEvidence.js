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
import { setPaymentEvidenceModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInputMask } from "react-native-masked-text";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import ScreenLoading from "../../loader/ScreenLoading";
import POPUpModal from "../POPUpModal";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
const { width } = Dimensions.get("screen");
const screenHeight = Dimensions.get("window").height;

const UploadPaymentEvidence = () => {
  const modal = useSelector((state) => state.alert.paymentEvidenceModal);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
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

    if (amount && amount < 100) {
      setEmptyFields(true);

      return;
    }
    if (!currency) {
      setEmptyFields(true);

      return;
    }
    if (!additionalInfo) {
      setEmptyFields(true);

      return;
    }

    setEmptyFields(false);
  }, [amount, currency, additionalInfo]);

  const previousStep = () => {
    if (isLoading) {
      return;
    }
    if (screenLoading?.status === true) {
      return;
    }
    closeModal();
  };

  const procceed = () => {
    setEmptyFields(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
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
    }, 400);
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
          {[
            "NAIRA (NGN)",
            "US DOLLAR (USD)",
            "EURO (EUR)",
            "UGANDA SHILLING (UGX)",
            "GREAT BRITISH POUNDS (GBP)",
            "GHANA CEDIS (GHS)",
            "RWANDA FRANCE (RWF)",
          ]?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[globalStyles.selectContainer, currency == item ? globalStyles.selectedItem : null]}
              onPress={() => {
                setShowCModal(false);
                setCurrency(item);
              }}
            >
              <View style={globalStyles.selectContent} key={index}>
                <Text style={[globalStyles.selectContentText, globalStyles.selectContentText1]}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </POPUpModal>

      <KeyboardAvoidingView style={{ marginTop: -40, flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{ height: screenHeight }}>
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
            <View style={{ width: width, height: screenHeight, flex: 1, alignItems: "center" }}>
              <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 12, width: "100%" }}>
                <View style={[globalStyles.productCardContent, { marginBottom: 0, width: "100%" }]}>
                  <View style={{ marginTop: 40, marginBottom: 30, width: "100%" }}>
                    <Text
                      style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 5, fontWeight: "800" }]}
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
                  <View style={{ marginTop: 10, marginBottom: 30 }}>
                    <Text
                      style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 5, fontWeight: "800" }]}
                    >
                      Currency
                    </Text>

                    <TouchableOpacity style={[globalStyles.inputContainer]} onPress={() => setShowCModal(true)}>
                      <TextInput value={currency} editable={false} style={globalStyles.inputTextt} />
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
                  <View style={{ marginTop: 10, marginBottom: 30 }}>
                    <Text
                      style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 5, fontWeight: "800" }]}
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
