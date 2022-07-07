import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef } from "react";
import IconSearch from "react-native-vector-icons/AntDesign";
import ProductCard from "./ProductCard";
import colors from "../../styles/colors";
import { useIsFocused } from "@react-navigation/native";
import LoadingComponents from "../loader/LoadingComponents";
import { useSelector } from "react-redux";
import NoItem from "../extra/NoItem";

const { width, height } = Dimensions.get("screen");

const AllProducts = () => {
  const isFocused = useIsFocused();
  const scrollViewRef = useRef();

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    if (isFocused) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }
  }, [isFocused]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.productContainer]}>
        <View style={[styles.modalSearchContainer]}>
          {/* <View style={[styles.modalSearch]}>
            <IconSearch name="search1" size={20} style={[styles.searchIcon, { color: colors.greenColor }]} />
            <TextInput style={styles.searchInput} placeholder="Search products..." />
          </View> */}
        </View>

        {loading ? (
          <View style={{ marginTop: 40, width: "100%", height }}>
            <LoadingComponents />
          </View>
        ) : products && products.length ? (
          products?.map((item, index) => <ProductCard key={index} item={item} index={index} />)
        ) : (
          <View style={{ marginTop: 40 }}>
            <NoItem item={{ type: "PRODUCTS", buttonText: "", message: "There are currently no available product" }} />
          </View>
        )}
      </View>
    </ScrollView>
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
