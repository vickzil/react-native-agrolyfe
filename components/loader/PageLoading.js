import { ActivityIndicator, Modal, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { globalStyles } from "../../styles/global";

const PageLoading = () => {
  const { height, width } = useWindowDimensions();
  const loading = useSelector((state) => state.alert.loading);

  return (
    <Modal transparent visible={loading?.status} animationType="fade">
      <View style={[styles.container, { height, width }]}>
        <View style={{ flex: 1, position: "relative", width: "100%", alignItems: "center" }}>
          <View style={[styles.loader]}>
            <ActivityIndicator size="large" color="#14961E" />
            {loading?.message ? (
              <View>
                <Text
                  style={[
                    globalStyles.label,
                    {
                      // marginBottom: -1,
                      marginLeft: 20,
                      fontSize: 17,
                      // marginTop: 8,
                      fontWeight: "700",
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
      </View>
    </Modal>
  );
};

export default PageLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    width: "95%",
    backgroundColor: "#fff",
    // marginHorizontal: 70,
    borderRadius: 10,
    // flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 29,
    paddingBottom: 22,
    elevation: 1,
    textAlign: "center",
  },
});
