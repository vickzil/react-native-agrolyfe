import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import NoItem from "../extra/NoItem";
import { useSelector } from "react-redux";
import LoadingComponents from "../loader/LoadingComponents";
import { globalStyles } from "../../styles/global";
import colors from "../../styles/colors";

const AllReferrals = () => {
  const referrals = useSelector((state) => state.referrals.referrals);
  const loading = useSelector((state) => state.referrals.loading);
  const theme = useSelector((state) => state.oauth.theme);

  const [allReferrals, setAllReferrals] = useState([]);

  useEffect(() => {
    if (referrals) {
      setAllReferrals(referrals?.referralData);
    }
  }, [referrals]);

  return (
    <View style={[styles.productContainer]}>
      <View style={styles.cardGrid}>
        {loading ? (
          <View
            style={{
              marginTop: 40,
              backgroundColor: theme === "dark" ? colors.darkCard : "#fff",
              padding: 30,
              alignItems: "center",
              paddingTop: 50,
              height: "100%",
            }}
          >
            <LoadingComponents />
            <Text style={[globalStyles.label, theme === "dark" && globalStyles.textLight]}>Loading referrals...</Text>
          </View>
        ) : allReferrals && allReferrals.length ? (
          <View style={styles.referralContainer}>
            {allReferrals.map((referral, index) => (
              <UserCard item={referral} key={index} index={index} />
            ))}
          </View>
        ) : (
          <View style={{ marginTop: 40 }}>
            <NoItem item={{ type: "REFERRALS", buttonText: "", message: "You have no Referrals" }} />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: 20,
    paddingBottom: 90,
  },

  cardGrid: {
    width: "97%",
    justifyContent: "center",
  },

  referralContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default AllReferrals;
