import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAccountManagerModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors";
import NoItem from "../../../extra/NoItem";
import LoadingComponents from "../../../loader/LoadingComponents";
import Modal from "react-native-modal";
import { globalStyles } from "../../../../styles/global";

const { width, height } = Dimensions.get("screen");

const AccountManagerModal = () => {
  const modal = useSelector((state) => state.alert.accountManagerModal);
  const accountManager = useSelector((state) => state.accountManager.accountManager);
  const loading = useSelector((state) => state.accountManager.loading);
  const theme = useSelector((state) => state.oauth.theme);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setAccountManagerModal(false));
  };

  return (
    <Modal
      isVisible={modal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={100}
      onBackButtonPress={() => closeModal()}
      onBackdropPress={() => closeModal()}
      onSwipeComplete={() => closeModal()}
      swipeDirection="right"
      style={{
        width: width,
        height: height,
        margin: 0,
        padding: 0,
        backgroundColor: theme === "dark" ? colors.darkBody : "#fff",
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>Account Manager</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            {loading ? (
              <View style={{ marginTop: 40 }}>
                <LoadingComponents />
              </View>
            ) : accountManager ? (
              <View style={[styles.userCard, theme === "dark" && globalStyles.cardDark]}>
                <View style={{ width: 100, height: 100, borderRadius: 100, padding: 4, backgroundColor: "#fff" }}>
                  <Image
                    source={{ uri: accountManager.photo }}
                    style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
                    resizeMode="cover"
                  />
                </View>
                <Text style={[styles.userCardText, { color: theme === "dark" ? "#fff" : colors.greenColor }]}>
                  {accountManager ? accountManager.firstName + " " + accountManager.lastName : "-----"}
                </Text>
                <Text
                  style={[
                    styles.userCardText,
                    { color: theme === "dark" ? "#aaa" : "#888", marginTop: 12, fontSize: 15 },
                  ]}
                >
                  {accountManager?.phoneNumber || "-----"}
                </Text>
                <Text
                  style={[
                    styles.userCardText,
                    { color: theme === "dark" ? "#aaa" : "#888", marginTop: 3, fontSize: 15 },
                  ]}
                >
                  {accountManager?.email || "-----"}
                </Text>
                <Text
                  style={[
                    styles.userCardText,
                    { color: theme === "dark" ? "#aaa" : "#888", marginTop: 3, fontSize: 15 },
                  ]}
                >
                  {accountManager?.countryName || "-----"}
                </Text>
              </View>
            ) : (
              <NoItem
                item={{
                  type: "REFERRALS",
                  buttonText: "",
                  message: "You are yet to be assigned to an account manager",
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,

    // elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "PoppinsBold",
    color: "#fff",
    marginLeft: -45,
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 100,
  },

  userCard: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 6,
    paddingBottom: 40,
    // elevation: 1,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 5,
  },

  userCardText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Montserrat",
    marginTop: 10,
  },
});
export default AccountManagerModal;
