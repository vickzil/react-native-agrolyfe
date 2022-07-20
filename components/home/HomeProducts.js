import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { globalStyles } from "../../styles/global";
import HomeProductItem from "./HomeProductItem";

const HomeProducts = () => {
  const navigate = useNavigation();
  const products = useSelector((state) => state.products.products);
  const theme = useSelector((state) => state.oauth.theme);

  return (
    products &&
    products?.length && (
      <View style={{ horizontalPadding: 25, marginTop: 10, marginBottom: 30 }}>
        <View style={globalStyles.siteTitleWrapper}>
          <Text style={[globalStyles.siteTitle, { marginBottom: 0 }, theme === "dark" && globalStyles.textLight]}>
            Farm Lands
          </Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => navigate.navigate("ProductNavigator")}
          >
            <Text style={[globalStyles.siteTitle, { marginBottom: 0 }, theme === "dark" && globalStyles.textLight]}>
              See All
            </Text>
            <Icon
              name="arrow-right"
              size={19}
              style={[{ color: "#111", marginLeft: 4 }, theme === "dark" && globalStyles.textLight]}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={products.slice(0, 3)}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.code}
          renderItem={({ item, index }) => <HomeProductItem item={item} key={index} index={index} />}
        />
      </View>
    )
  );
};

export default HomeProducts;
