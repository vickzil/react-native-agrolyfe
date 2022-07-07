import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
// import { products } from "../../constant/products";
import PurchaseCard from "./PurchaseCard";
import { globalStyles } from "../../styles/global";
import NoInvestments from "./NoInvestments";
import { useSelector } from "react-redux";

const products = [];

const MyProducts = () => {
  const products = useSelector((state) => state.products.myProducts);
  const loading = useSelector((state) => state.products.myLoading);
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    if (products) {
      if (
        products &&
        products?.investmentInfo &&
        products?.investmentInfo?.activeUserInvestments &&
        products?.investmentInfo?.activeUserInvestments.length
      ) {
        setMyProducts(products?.investmentInfo?.activeUserInvestments);
      }
    }
  }, [products]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.productContainer]}>
        {myProducts.length ? (
          <View style={{ marginTop: 60, width: "100%", paddingBottom: 100 }}>
            <View>
              <Text
                style={[
                  globalStyles.siteTitle,
                  {
                    fontWeight: "800",
                    fontSize: 18,
                    textTransform: "capitalize",
                    fontFamily: "MontserratBold",

                    textAlign: "center",
                    width: "100%",
                  },
                ]}
              >
                My Purchases
              </Text>
            </View>

            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
              {myProducts?.map((item, index) => (
                <PurchaseCard key={index} item={item} index={index} />
              ))}
            </View>
          </View>
        ) : (
          <NoInvestments />
        )}
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
  },
});
