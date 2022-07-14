import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { globalStyles } from "../../styles/global";

const PageLoading = () => {
  const { height, width } = useWindowDimensions();
  const loading = useSelector((state) => state.alert.loading);

  return (
    loading?.status && (
      <View style={[styles.container, { height, width }]}>
        <View style={[styles.loader]}>
          <ActivityIndicator size="large" color="#14961E" />
          {loading?.message ? (
            <View>
              <Text
                style={[
                  globalStyles.label,
                  {
                    marginBottom: -5,
                    fontSize: 16,
                    marginTop: 19,
                    fontWeight: "600",
                    color: "#4d4b4b",
                    fontFamily: "Poppins",
                  },
                ]}
              >
                {loading.message}
              </Text>
            </View>
          ) : null}
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
    backgroundColor: "rgba(0,0,0,0.7)",
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
