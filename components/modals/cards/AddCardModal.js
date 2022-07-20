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
import {
  setAddCardModal,
  setCardModal,
  setFundWalletByCardModal,
  setMySavingsDetailsModal,
  setMySavingsModal,
  setSelectCardModal,
  setTopUpSavingsModal,
} from "../../../store/alert/alertSlice";
import { globalStyles } from "../../../styles/global";
import colors from "../../../styles/colors";
import PayStackPackage from "../../customs/PayStackPackage";
import { setPaystackRef } from "../../../store/auth/authSlice";

const { width } = Dimensions.get("screen");

const AddCardModal = () => {
  const modal = useSelector((state) => state.alert.addCardModal);
  const dispatch = useDispatch();
  const scaleValue = useRef(new Animated.Value(0)).current;

  const theme = useSelector((state) => state.oauth.theme);

  const paystackWebViewRef = useRef();

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

  const onSuccess = (response) => {
    // console.log(response);
    if (response?.status === "success") {
      // console.log("succss");
      // console.log(response?.transactionRef);
      // console.log(response?.transactionRef?.trxref);
      dispatch(setPaystackRef(response?.transactionRef?.trxref));
    }
    closeModal();
    dispatch(
      setSelectCardModal({
        status: false,
        type: "",
      }),
    );

    dispatch(
      setFundWalletByCardModal({
        status: false,
        card: null,
      }),
    );

    dispatch(
      setTopUpSavingsModal({
        status: false,
        payload: null,
      }),
    );

    dispatch(
      setMySavingsDetailsModal({
        status: false,
        payload: null,
      }),
    );

    dispatch(setMySavingsModal(false));

    dispatch(setCardModal(false));
  };

  const onError = () => {
    closeModal();
  };

  const showPaystackPayment = () => {
    paystackWebViewRef.current.startTransaction();
    //
  };

  const insertUserCard = () => {
    paystackWebViewRef.current.startTransaction();
    //
  };

  return (
    <Modal transparent visible={modal} animationType="fade" onRequestClose={() => closeModal()}>
      <PayStackPackage amount={100} paystackWebViewRef={paystackWebViewRef} onSuccess={onSuccess} onError={onError} />
      <View style={[styles.modalBackground, { flex: 1 }]}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
            theme === "dark" && globalStyles.containerDark,
          ]}
        >
          <View style={{ alignItems: "center" }}>
            {/* <View style={styles.header}>
              <AntDesignIcon name="close" size={20} />
            </View> */}
            <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}>Add Card</Text>

            <Text
              style={[
                { marginVertical: 30, fontSize: 18, textAlign: "center" },
                theme === "dark" && globalStyles.textLightLight,
              ]}
            >
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
                  { marginTop: 20, borderRadius: 6, zIndex: 6, width: 200, backgroundColor: "#3d665d", height: 50 },
                ]}
                onPress={() => showPaystackPayment()}
              >
                <Text style={globalStyles.buttonText}>Proceed with paystack</Text>
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
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "PoppinsBold",
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
