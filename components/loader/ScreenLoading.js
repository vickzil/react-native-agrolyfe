import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/global";

const ScreenLoading = ({ visibility }) => {
  const { height, width } = useWindowDimensions();

  return (
    visibility?.status && (
      <View style={[styles.container, { height, width }]}>
        <View style={[styles.loader]}>
          <ActivityIndicator size="large" color="#14961E" />
          {visibility?.message ? (
            <View>
              <Text
                style={[
                  globalStyles.label,
                  { marginBottom: -5, fontSize: 16, marginTop: 19, fontWeight: "700", color: "#4d4b4b" },
                ]}
              >
                {visibility?.message}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    )
  );
};

export default ScreenLoading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  loader: {
    // height: 70,
    width: "auto",
    backgroundColor: "#fff",
    // marginHorizontal: 70,
    borderRadius: 5,
    // flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation: 1,
  },
});
