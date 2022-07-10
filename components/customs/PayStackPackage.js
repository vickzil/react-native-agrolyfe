import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Paystack } from "react-native-paystack-webview";

const PayStackPackage = ({ paystackWebViewRef, amount, onSuccess, onError }) => {
  const user = useSelector((state) => state.oauth.user);
  const walletOptions = useSelector((state) => state.wallet.walletOptions);
  const [paystackKey, setPaystackKey] = useState(null);

  useEffect(() => {
    if (walletOptions) {
      setPaystackKey(walletOptions?.byCard.items[0]?.publicKey);
    }
  }, [user, walletOptions]);

  //   "pk_test_468a20e8520b9a2d70dddc7fe1cd3042e2061659"

  return (
    <Paystack
      paystackKey={paystackKey}
      billingEmail={user?.email}
      amount={amount}
      onCancel={(e) => {
        onError();
        // handle response here
      }}
      onSuccess={(res) => {
        onSuccess(res);
        // handle response here
      }}
      ref={paystackWebViewRef}
    />
  );
};

const styles = StyleSheet.create({});

export default PayStackPackage;
