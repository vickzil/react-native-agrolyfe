import React, { useEffect, useRef } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import colors from "../../styles/colors";
import { globalStyles } from "../../styles/global";

const ConfirmationModalButtom = ({ bottomSheet, closeModal, message }) => {
  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={450}
        onRequestClose={() => closeModal()}
        style={{ position: "relative" }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            position: "absolute",
            bottom: 30,
            paddingHorizontal: 20,
          }}
        >
          <AntDesignIcon name="checkcircle" size={90} style={[styles.Icon, { marginTop: 30 }]} />

          <Text
            style={[
              {
                marginVertical: 10,
                fontSize: 25,
                textAlign: "center",
                fontWeight: "700",
                fontFamily: "Poppins",
                letterSpacing: -0.35644,
              },
            ]}
          >
            SuccessFul
          </Text>
          <Text
            style={[
              { marginVertical: 20, fontSize: 16, textAlign: "center", fontFamily: "Poppins", letterSpacing: -0.35644 },
            ]}
          >
            {message}
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              globalStyles.button,
              { marginTop: 20, borderRadius: 6, zIndex: 6, width: "85%", backgroundColor: "#3d665d" },
            ]}
            onPress={() => closeModal()}
          >
            <Text style={globalStyles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  accountTabs: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 8,
    marginTop: 30,
    paddingBottom: 0,
    // paddingRight: 30,
  },

  Icon: {
    color: colors.greenColor,
    alignItems: "center",
  },
});

export default ConfirmationModalButtom;
