import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";

const Loader = ({ visible = false, message }) => {
  const { height, width } = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, { height, width }]}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#14961E" />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>Please wait...</Text>
        </View>
      </View>
    )
  );
};

export default Loader;

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
    height: 70,
    backgroundColor: "#fff",
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
