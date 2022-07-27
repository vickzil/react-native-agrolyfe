import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { useIsFocused } from "@react-navigation/native";
import LoadingComponents from "../loader/LoadingComponents";
import { useSelector } from "react-redux";
import NoItem from "../extra/NoItem";
import { globalStyles } from "../../styles/global";
import SvgComponent from "../customs/SvgComponent";

const { width, height } = Dimensions.get("screen");

const AllProducts = () => {
  const isFocused = useIsFocused();
  const scrollViewRef = useRef();

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const theme = useSelector((state) => state.oauth.theme);

  useEffect(() => {
    return () => {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    };
  }, [isFocused]);

  return (
    <View style={[{ flex: 1 }, theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight]}>
      <SvgComponent />
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} style={[{ position: "relative" }]}>
        <View style={[styles.productContainer]}>
          <View style={[styles.modalSearchContainer]}>
            {/* <View style={[styles.modalSearch]}>
            <IconSearch name="search1" size={20} style={[styles.searchIcon, { color: colors.greenColor }]} />
            <TextInput style={styles.searchInput} placeholder="Search products..." />
          </View> */}
          </View>
          <View>
            <Text
              style={[
                globalStyles.siteTitle,
                {
                  fontWeight: "600",
                  fontSize: 17,
                  textTransform: "capitalize",
                  fontFamily: "PoppinsBold",
                  marginBottom: 30,
                  textAlign: "center",
                  width: "100%",
                },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              Available Farm Lands
            </Text>
          </View>

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
              <Text style={[globalStyles.label, theme === "dark" && globalStyles.textLight]}>
                Loading farm lands...
              </Text>
            </View>
          ) : products && products.length ? (
            products?.map((item, index) => <ProductCard key={index} item={item} index={index} />)
          ) : (
            <View
              style={[
                {
                  width,
                  height,
                  // justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                },
                theme === "dark" && globalStyles.cardDark,
              ]}
            >
              <NoItem
                item={{ type: "PRODUCTS", buttonText: "", message: "There are currently no available product" }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 0,
  },

  modalSearch: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ced4ed",
  },

  searchIcon: {
    marginRight: 15,
  },

  searchInput: {
    fontSize: 16,
    color: "#444",
  },

  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 140,
  },
});

export default AllProducts;
