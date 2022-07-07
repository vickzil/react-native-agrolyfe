import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAccountManagerModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors";
import NoItem from "../../../extra/NoItem";
import LoadingComponents from "../../../loader/LoadingComponents";

const userImage = require("../../../../assets/img/user.jpg");

const { width } = Dimensions.get("screen");

const AccountManagerModal = () => {
  const modal = useSelector((state) => state.alert.accountManagerModal);
  const accountManager = useSelector((state) => state.accountManager.accountManager);
  const loading = useSelector((state) => state.accountManager.loading);

  const dispatch = useDispatch();
  const [hasAccountManager] = useState(true);

  return (
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={() => {
        dispatch(setAccountManagerModal(false));
      }}
    >
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => dispatch(setAccountManagerModal(false))}
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
              <View style={styles.userCard}>
                <View style={{ width: 100, height: 100, borderRadius: 100, padding: 4, backgroundColor: "#fff" }}>
                  <Image
                    source={{ uri: accountManager.photo }}
                    style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
                    resizeMode="cover"
                  />
                </View>
                <Text style={[styles.userCardText, { color: colors.greenColor }]}>
                  {accountManager ? accountManager.firstName + " " + accountManager.lastName : "-----"}
                </Text>
                <Text style={[styles.userCardText, { color: "#888", marginTop: 12, fontSize: 15 }]}>
                  {accountManager?.phoneNumber || "-----"}
                </Text>
                <Text style={[styles.userCardText, { color: "#888", marginTop: 3, fontSize: 15 }]}>
                  {accountManager?.email || "-----"}
                </Text>
                <Text style={[styles.userCardText, { color: "#888", marginTop: 3, fontSize: 15 }]}>
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
    fontWeight: "700",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Montserrat",
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
