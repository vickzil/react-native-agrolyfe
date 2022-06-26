import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../../styles/global";
import ReferralInvestmentItem from "./ReferralInvestmentItem";

const ReferralInvestment = () => {
  return (
    <View style={styles.referralInvestmentContainer}>
      <Text
        style={[
          globalStyles.siteTitle,
          {
            fontWeight: "800",
            fontSize: 18,
            marginBottom: 0,
            textTransform: "capitalize",
            fontFamily: "MontserratBold",
          },
        ]}
      >
        Referral Investment
      </Text>
      <View style={{ width: "100%" }}>
        <ReferralInvestmentItem />
        <ReferralInvestmentItem />
        <ReferralInvestmentItem />
        <ReferralInvestmentItem />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  referralInvestmentContainer: {
    width: "90%",
    marginTop: 10,
  },
});
export default ReferralInvestment;
