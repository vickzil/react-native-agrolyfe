import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../../styles/global";
import ReferralInvestmentItem from "./ReferralInvestmentItem";
import LoadingComponents from "../../loader/LoadingComponents";
import NoItem from "../../extra/NoItem";
import PurchaseCard from "../../products/PurchaseCard";
import { useSelector } from "react-redux";

const { height } = Dimensions.get("screen");

const ReferralInvestment = ({ item, investments, loading }) => {
  const theme = useSelector((state) => state.oauth.theme);

  return (
    <View style={styles.referralInvestmentContainer}>
      <Text
        style={[
          globalStyles.siteTitle,
          {
            fontWeight: "800",
            fontSize: 18,
            marginBottom: 0,
            marginTop: 10,
            textTransform: "capitalize",
            fontFamily: "MontserratBold",
          },
          theme === "dark" && globalStyles.textLight,
        ]}
      >
        {item ? item?.firstName + "'s " : "Referral"} Investment
      </Text>
      <View style={{ width: "100%" }}>
        {loading ? (
          <View
            style={[
              {
                marginTop: 40,
                backgroundColor: "#fff",
                padding: 30,
                alignItems: "center",
                paddingTop: 50,
                height: "100%",
                width: "100%",
              },
              theme === "dark" && globalStyles.cardDark,
            ]}
          >
            <LoadingComponents />
            <Text style={[globalStyles.label, theme === "dark" && globalStyles.textLight]}>Loading products...</Text>
          </View>
        ) : investments && investments.length ? (
          <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 30, padding: 0 }}>
            {investments.map((investment, index) => (
              <PurchaseCard item={investment} key={index} index={index} />
            ))}
          </View>
        ) : (
          <View style={{ marginTop: 40 }}>
            <NoItem item={{ type: "REFERRALS", buttonText: "", message: `${item.firstName} has no investment` }} />
          </View>
        )}
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
