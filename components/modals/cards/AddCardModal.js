import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { setAddCardModal } from "../../../store/alert/alertSlice";
import { globalStyles } from "../../../styles/global";
import colors from "../../../styles/colors";

const { width } = Dimensions.get("screen");

const AddCardModal = () => {
  const modal = useSelector((state) => state.alert.addCardModal);
  const dispatch = useDispatch();
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modal === true) {
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animated.timing(scaleValue, {
      //   toValue: 1,
      //   duration: 200,
      //   useNativeDriver: true,
      // }).start();
    }
  }, [modal]);

  const closeModal = () => {
    dispatch(setAddCardModal(false));
  };

  return (
    <Modal transparent visible={modal} animationType="fade" onRequestClose={() => closeModal()}>
      <View style={[styles.modalBackground, { flex: 1 }]}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          <View style={{ alignItems: "center" }}>
            {/* <View style={styles.header}>
              <AntDesignIcon name="close" size={20} />
            </View> */}
            <Text style={styles.modalHeaderText}>Add Card</Text>

            <Text style={[{ marginVertical: 30, fontSize: 18, textAlign: "center" }]}>
              To add and verify your card ₦ 100 will be charged.
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  globalStyles.button,
                  {
                    marginTop: 20,
                    borderRadius: 6,
                    zIndex: 6,
                    width: 100,
                    backgroundColor: "#fff",
                    borderWidth: 2,
                    borderColor: "#f0f0f0",
                    marginRight: 10,
                    height: 50,
                  },
                ]}
                onPress={() => closeModal()}
              >
                <Text style={[globalStyles.buttonText, { color: "#222" }]}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  globalStyles.button,
                  { marginTop: 20, borderRadius: 6, zIndex: 6, width: 140, backgroundColor: "#3d665d", height: 50 },
                ]}
                onPress={() => closeModal()}
              >
                <Text style={globalStyles.buttonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    width,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "94%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingBottom: 20,
    borderRadius: 20,
    elevation: 10,
  },

  header: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
    color: "#333",
  },

  Icon: {
    color: colors.greenColor,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
  },
});
export default AddCardModal;
