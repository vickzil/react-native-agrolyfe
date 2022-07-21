import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { setAlertModal, setSelectAllBankModal } from "../../../store/alert/alertSlice";
import { getUserInfo } from "../../../store/auth/actions";
import colors from "../../../styles/colors";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import { getAllUserBankAccounts } from "../../../store/bank/actions";

const AddBankForm = ({
  closeModal,
  isLoading,
  setIsLoading,
  accountNumber,
  setAccountNumber,
  accountNumberOld,
  setAccountNumberOld,
  emptyFields,
  setEmptyFields,
  accountName,
  setAccountName,
  accountNameError,
  setAccountNameError,
  theme,
}) => {
  const modal = useSelector((state) => state.alert.addbvnModal);
  const selectedBank = useSelector((state) => state.alert.selectedAllBank);
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedBank) {
      setEmptyFields(true);

      return;
    }

    if (!accountNumber) {
      setEmptyFields(true);

      return;
    }
    if (!accountName) {
      setEmptyFields(true);

      return;
    }

    setEmptyFields(false);
  }, [selectedBank, accountNumber, accountName]);

  useEffect(() => {
    if (selectedBank) {
      setAccountNumberOld("");
      checkIfInputs();
    }
  }, [selectedBank]);

  const procceedToClose = () => {
    closeModal();
  };

  const checkIfInputs = () => {
    if (selectedBank && accountNumber) {
      if (accountNumberOld === accountNumber) {
        return;
      }

      verifyAccountNumber();
    }
  };

  const verifyAccountNumber = () => {
    setEmptyFields(true);
    setIsLoading(true);
    setAccountName(null);
    setAccountNameError("");

    axios
      .post(
        `${baseURL}/v1.0/UserBankAccount/verifyBankAccount`,
        {
          AppId: AppId,
          RequestId: RequestId,
          Email: user?.email,
          UserCode: user?.code,
          BankCode: selectedBank?.code,
          AccountNumber: accountNumber,
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
          let responseData = response.data.data.accountName;

          // console.log(responseData);
          setAccountName(responseData);
          setAccountNumberOld(accountNumber);
          setAccountNameError("");
          setIsLoading(false);
          // setEmptyFields(false);
        } else {
          setIsLoading(false);
          setAccountNameError(response.data.message);
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

  const addUserBank = () => {
    if (emptyFields === true) {
      return;
    }

    setEmptyFields(true);
    setIsLoading(true);

    axios
      .post(
        `${baseURL}/v1.0/UserBankAccount/insertUserBankAccount`,
        {
          AppId: AppId,
          RequestId: RequestId,
          UserCode: user?.code,
          AccountNo: accountNumber,
          BankCode: selectedBank?.code,
          Country: user.country ? user.country : "NG",
          AccountName: accountName,
          BankVerificationNumber: user.bvn,
          AdditionalInfo: "",
          Currency: "NGN",
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
          setIsLoading(false);
          setEmptyFields(false);

          dispatch(
            setAlertModal({
              status: true,
              type: "SUCCESS",
              title: "Bank Details Added",
              des: response.data.message,
              payload: null,
            }),
          );

          procceedToClose();

          dispatch(getUserInfo(user?.code));
          dispatch(getAllUserBankAccounts(user?.code));
        } else {
          setIsLoading(false);

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

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.productContainer, { width: "100%" }]}>
          <View style={{ width: "90%" }}>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
              <Text
                style={[
                  styles.productCardContentItemLeft,
                  { fontSize: 18, marginBottom: 5, fontWeight: "800" },
                  theme === "dark" && globalStyles.textLight,
                ]}
              >
                Select Bank
              </Text>
              <TouchableOpacity
                style={[globalStyles.inputContainer, { height: 50 }, theme === "dark" && globalStyles.cardDark]}
                onPress={() =>
                  dispatch(
                    setSelectAllBankModal({
                      status: true,
                      type: "Add_BANK",
                    }),
                  )
                }
              >
                <Text style={[globalStyles.inputTextt, theme === "dark" && globalStyles.textLight]}>
                  {" "}
                  {selectedBank ? selectedBank.name : "Select bank"}{" "}
                </Text>
                <Icon name="chevron-down" size={24} style={[{ color: "#222", marginLeft: -10 }]} />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <Text
                style={[
                  styles.productCardContentItemLeft,
                  { fontSize: 18, marginBottom: 5, fontWeight: "800" },
                  theme === "dark" && globalStyles.textLight,
                ]}
              >
                Account Number
              </Text>
              <View style={[globalStyles.inputContainer, { height: 57 }, theme === "dark" && globalStyles.cardDark]}>
                <TextInput
                  keyboardType="numeric"
                  value={accountNumber}
                  onChangeText={(text) => setAccountNumber(text)}
                  onBlur={() => checkIfInputs()}
                  autoCorrect={false}
                  style={[globalStyles.inputTextt, theme === "dark" && globalStyles.textLight]}
                />
              </View>
              {accountNameError ? (
                <Text style={{ color: "red", fontSize: 14, marginTop: 7 }}>{accountNameError}</Text>
              ) : null}
            </View>
            {accountName ? (
              <View style={styles.productCardContent}>
                <View style={[styles.productCardAccount]}>
                  <Text style={[styles.productCardContentItemLeft, { textAlign: "center", color: "#fff" }]}>
                    Account name
                  </Text>
                  <Text style={[styles.productCardContentItemRight, { fontWeight: "700", color: "#fff" }]}>
                    {accountName}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>

          <View style={{ width: "90%" }}>
            <CustomLoadingButton
              onPress={() => addUserBank()}
              emptyFields={emptyFields}
              buttonText={"Add Bank"}
              loading={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  productCardContentItem: {
    // flexDirection: "row",
    paddingBottom: 25,
    paddingTop: 9,
  },

  productCardContentItemLeft: {
    width: "100%",
    fontSize: 18,
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

  productCardContent: {
    // paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  productCardAccount: {
    // flexDirection: "row",
    backgroundColor: colors.greenDarkColor,
    paddingVertical: 20,
    paddingHorizontal: 13,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.greenLightColor,
    borderRadius: 20,
  },
});

export default AddBankForm;
