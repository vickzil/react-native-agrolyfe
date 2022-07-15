import { Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { setFeedbackModal, setFeedbackPromptModal } from "../../../store/alert/alertSlice";
import { globalStyles } from "../../../styles/global";
import colors from "../../../styles/colors";

const { width } = Dimensions.get("screen");

const FeedbackPromptModal = () => {
  const modal = useSelector((state) => state.alert.feedbackPromptModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setFeedbackPromptModal(false));
  };

  const proceed = () => {
    dispatch(setFeedbackModal(true));
    dispatch(setFeedbackPromptModal(false));
  };

  return (
    <Modal transparent visible={modal} animationType="fade" onRequestClose={() => closeModal()}>
      <View style={[styles.modalBackground, { flex: 1 }]}>
        <View style={[styles.modalContainer]}>
          <View style={{ alignItems: "center" }}>
            <AntDesignIcon
              name="form"
              size={50}
              style={[
                styles.Icon,
                {
                  marginTop: 30,
                  color: "#fff",
                  backgroundColor: colors.greenProductColor,
                  padding: 20,
                  borderRadius: 100,
                },
              ]}
            />

            <Text
              style={[
                { marginVertical: 10, fontSize: 20, textAlign: "center", marginLeft: -10, fontFamily: "PoppinsBold" },
              ]}
            >
              We'd welcome your feedback
            </Text>
            <Text style={[{ marginVertical: 20, fontSize: 15, textAlign: "center", fontFamily: "Poppins" }]}>
              Thank you for making use of our platform. Would you like to participate in a brief customer satisfaction
              survey to let us know how we can improve your experience.
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
                  {
                    marginTop: 20,
                    borderRadius: 6,
                    zIndex: 6,
                    width: 200,
                    backgroundColor: colors.greenProductColor,
                    height: 50,
                  },
                ]}
                onPress={() => proceed()}
              >
                <Text style={globalStyles.buttonText}>Yes, Please</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    width: "95%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 10,
  },

  header: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  Icon: {
    color: colors.greenColor,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
  },
});
export default FeedbackPromptModal;
