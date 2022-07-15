import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { setAlertModal, setSelectAllBankModal } from "../../../../store/alert/alertSlice";
import { getUserInfo } from "../../../../store/auth/actions";
import { globalStyles } from "../../../../styles/global";
import CustomLoadingButton from "../../../customs/CustomLoadingButton";
import colors from "../../../../styles/colors";

const AddBvnForm = ({
  closeModal,
  isLoading,
  setIsLoading,
  accountNumber,
  setAccountNumber,
  accountNumberOld,
  setAccountNumberOld,
  emptyFields,
  setEmptyFields,
  bvn,
  setBvn,
  accountName,
  setAccountName,
  accountNameError,
  setAccountNameError,
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
    if (!bvn) {
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
  }, [selectedBank, accountNumber, bvn, accountName]);

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

  const updateBVN = () => {
    if (emptyFields === true) {
      return;
    }

    setEmptyFields(true);
    setIsLoading(true);

    axios
      .post(
        `${baseURL}/v1.0/UserOnboard/addUserBVN`,
        {
          AppId: AppId,
          RequestId: RequestId,
          UserCode: user?.code,
          BVN: bvn,
          AccountNo: accountNumber,
          BankCode: selectedBank?.code,
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
              title: "BVN & Bank Details Added",
              des: response.data.message,
              payload: null,
            }),
          );

          procceedToClose();

          dispatch(getUserInfo(user?.code));
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
              <Text style={[styles.productCardContentItemLeft, { fontSize: 15, marginBottom: 5 }]}>Select Bank</Text>
              <TouchableOpacity
                style={[globalStyles.inputContainer, { height: 50 }]}
                onPress={() =>
                  dispatch(
                    setSelectAllBankModal({
                      status: true,
                      type: "Add_BVN",
                    }),
                  )
                }
              >
                <Text style={globalStyles.inputTextt}> {selectedBank ? selectedBank.name : "Select bank"} </Text>
                <Icon name="chevron-down" size={24} style={[{ color: "#222", marginLeft: -10 }]} />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <Text style={[styles.productCardContentItemLeft, { fontSize: 15, marginBottom: 5 }]}>Account Number</Text>
              <View style={[globalStyles.inputContainer, { height: 57 }]}>
                <TextInput
                  keyboardType="numeric"
                  value={accountNumber}
                  onChangeText={(text) => setAccountNumber(text)}
                  onBlur={() => checkIfInputs()}
                  autoCorrect={false}
                  style={globalStyles.inputTextt}
                />
              </View>
              {accountNameError ? (
                <Text style={{ color: "red", fontSize: 14, marginTop: 7 }}>{accountNameError}</Text>
              ) : null}
            </View>
            {accountName ? (
              <>
                <View style={styles.productCardContent}>
                  <View style={[styles.productCardAccount]}>
                    {/* <Text style={[styles.productCardContentItemLeft, { textAlign: "center", color: colors.greenColor }]}>
                    Account name
                  </Text> */}
                    <Text style={[styles.productCardContentItemRight, { fontWeight: "600", color: colors.greenColor }]}>
                      {accountName}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Text style={[styles.productCardContentItemLeft, { fontSize: 15, marginBottom: 5 }]}>Bvn</Text>
                  <View style={[globalStyles.inputContainer, { height: 57 }]}>
                    <TextInput
                      keyboardType="numeric"
                      value={bvn}
                      onChangeText={(text) => setBvn(text)}
                      autoCorrect={false}
                      style={globalStyles.inputTextt}
                    />
                  </View>
                </View>
              </>
            ) : null}
          </View>

          <View style={{ width: "90%" }}>
            <CustomLoadingButton
              onPress={() => updateBVN()}
              emptyFields={emptyFields}
              buttonText={"Add Bvn"}
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
    backgroundColor: "#edf9ee",
    paddingVertical: 10,
    paddingHorizontal: 13,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#b6dbb9",
    borderRadius: 10,
  },
});
export default AddBvnForm;
