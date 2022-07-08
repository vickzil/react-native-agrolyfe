import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingComponents = () => {
  return (
    <View style={styles.loadingItem}>
      <ActivityIndicator size="large" color="#14961E" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingItem: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginBottom: 10,
  },
});

export default LoadingComponents;
