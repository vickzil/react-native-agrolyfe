import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const PageLoading = () => {
  const { height, width } = useWindowDimensions();
  const loading = useSelector((state) => state.alert.loading);
  return (
    loading?.status && (
      <View style={[styles.container, { height, width }]}>
        <View style={[styles.loader]}>
          <ActivityIndicator size="large" color="#14961E" />
          <Text style={{ marginLeft: 10, fontSize: 16, marginTop: 10 }}>{loading.message}</Text>
        </View>
      </View>
    )
  );
};

export default PageLoading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
  },

  loader: {
    // height: 70,
    backgroundColor: "#fff",
    marginHorizontal: 70,
    borderRadius: 5,
    // flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
