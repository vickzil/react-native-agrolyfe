import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import UserCard from "./UserCard";
import NoItem from "../extra/NoItem";

const referrals = [
  {
    id: 1,
    name: "Victor Nwakwue",
    code: "CUSUV87557",
    img: require("../../assets/img/user.jpg"),
  },
  {
    id: 2,
    name: "Ik Daniel",
    code: "CUSUV87557",
    img: require("../../assets/img/user.jpg"),
  },
  {
    id: 3,
    name: "Chima Obi",
    code: "CUSUV87557",
    img: require("../../assets/img/user.jpg"),
  },
  {
    id: 4,
    name: "Chima Obi",
    code: "CUSUV87557",
    img: require("../../assets/img/user.jpg"),
  },
  {
    id: 5,
    name: "Chima Obi",
    code: "CUSUV87557",
    img: require("../../assets/img/user.jpg"),
  },
  {
    id: 6,
    name: "Chima Obi",
    code: "CUSUV87557",
    img: require("../../assets/img/user.jpg"),
  },
];

const AllReferrals = () => {
  return (
    <View style={[styles.productContainer]}>
      <View style={styles.cardGrid}>
        {referrals.length ? (
          <View style={styles.referralContainer}>
            {referrals.map((referral, index) => (
              <UserCard item={referral} key={index} index={index} />
            ))}
          </View>
        ) : (
          <View style={{ marginTop: 50 }}>
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
