import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
// import { products } from "../../constant/products";
import PurchaseCard from "./PurchaseCard";
import { globalStyles } from "../../styles/global";
import NoInvestments from "./NoInvestments";
import { useSelector } from "react-redux";
import LoadingComponents from "../loader/LoadingComponents";
import SvgComponent from "../customs/SvgComponent";

const products = [];

const MyProducts = () => {
  const products = useSelector((state) => state.products.myProducts);
  const loading = useSelector((state) => state.products.myLoading);
  const theme = useSelector((state) => state.oauth.theme);
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
    <View style={[{ flex: 1 }, theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight]}>
      <SvgComponent />
      <ScrollView showsVerticalScrollIndicator={false} style={[{ position: "relative" }]}>
        <View style={[styles.productContainer]}>
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
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              <LoadingComponents />
              <Text style={[globalStyles.label, theme === "dark" && globalStyles.textLight]}>
                Loading my purchases...
              </Text>
            </View>
          ) : myProducts && myProducts.length ? (
            <View style={{ marginTop: 60, width: "100%", paddingBottom: 100 }}>
              <View>
                <Text
                  style={[
                    globalStyles.siteTitle,
                    {
                      fontWeight: "600",
                      fontSize: 17,
                      textTransform: "capitalize",
                      fontFamily: "PoppinsBold",
                      textAlign: "center",
                      width: "100%",
                    },
                    theme === "dark" && globalStyles.textLight,
                  ]}
                >
                  Purchased Farm Lands
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                  paddingHorizontal: 15,
                }}
              >
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
    </View>
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
