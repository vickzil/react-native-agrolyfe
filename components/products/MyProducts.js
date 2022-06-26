import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { products } from "../../constant/products";
import PurchaseCard from "./PurchaseCard";
import { globalStyles } from "../../styles/global";

const MyProducts = () => {
  return (
    <ScrollView>
      <View style={[styles.productContainer]}>
        <Text
          style={[
            globalStyles.siteTitle,
            {
              fontWeight: "800",
              fontSize: 18,
              marginBottom: 0,
              textTransform: "capitalize",
              fontFamily: "MontserratBold",
              marginTop: 60,
              textAlign: "left",
              width: "100%",
              marginLeft: 30,
            },
          ]}
        >
          My Purchases
        </Text>
        {products?.map((item, index) => (
          <PurchaseCard key={index} item={item} index={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default MyProducts;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 140,
  },
});
