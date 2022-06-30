import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCardModal, setPaymentEvidenceModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import { globalStyles } from "../../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CurrencyInput from "react-native-currency-input";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import { Dropdown } from "react-native-element-dropdown";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
const { width } = Dimensions.get("screen");

const UploadPaymentEvidence = () => {
  const modal = useSelector((state) => state.alert.paymentEvidenceModal);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [emptyFields, setEmptyFields] = useState(true);

  const closeFundModal = () => {
    dispatch(setPaymentEvidenceModal(false));
  };

  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item}</Text>
      </View>
    );
  };

  const procceed = () => {
    closeFundModal();
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeFundModal()}>
      <FocusAwareStatusBar backgroundColor={colors.greenDarkColor} barStyle="light-content" />

      <View style={{ marginTop: -40 }}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => closeFundModal()}
          />
          <Text style={styles.modalHeaderText}>Upload payment Evidence</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 12 }}>
          <View style={{ marginBottom: 0, marginTop: 0 }}>
            <Text style={[globalStyles.label, { fontSize: 22, textAlign: "left", marginBottom: 0, fontWeight: "900" }]}>
              {/* Upload payment Evidence */}
            </Text>
            <Text style={[globalStyles.label, { fontSize: 18, textAlign: "left", marginBottom: 0, fontWeight: "600" }]}>
              Have you already made payment by transfer, kindly upload payment evidence.{" "}
            </Text>
          </View>
          <View style={[globalStyles.productCardContent, { marginBottom: 0 }]}>
            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <Text style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 20, fontWeight: "800" }]}>
                Amount
              </Text>
              <CurrencyInput
                value={amount}
                onChangeValue={setAmount}
                prefix="₦ "
                delimiter=","
                // separator="."
                precision={0}
                // onChangeText={(formattedValue) => {
                //   console.log(formattedValue);
                // }}
                style={[globalStyles.inputTextt, globalStyles.inputContainer, { fontSize: 33, fontWeight: "800" }]}
              />
            </View>
            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <Text style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 20, fontWeight: "800" }]}>
                Currency
              </Text>
              <Dropdown
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
              />
            </View>
            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <Text style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 20, fontWeight: "800" }]}>
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

          <View style={[globalStyles.productContainer, { marginTop: 0 }]}>
            <CustomLoadingButton
              onPress={() => procceed()}
              emptyFields={emptyFields}
              buttonText={buttonText}
              loading={false}
            />
          </View>

          <View style={{ marginBottom: 50 }}></View>
        </ScrollView>
      </View>
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
    elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Montserrat",
    color: "#fff",
    marginLeft: -45,
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

  productCardContentItemLeft: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginRight: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  dropdown: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.greenColor,
    marginTop: 0,
    padding: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});
export default UploadPaymentEvidence;
