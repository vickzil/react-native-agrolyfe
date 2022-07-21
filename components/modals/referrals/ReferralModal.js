import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReferralModal, setToastModal } from "../../../store/alert/alertSlice";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import AllReferrals from "../../referrals/AllReferrals";
import { copyLink } from "../../helpers/globalFunction";
import SvgComponent2 from "../../customs/SvgComponent2";
import SvgComponent from "../../customs/SvgComponent";
import { globalStyles } from "../../../styles/global";

const { width } = Dimensions.get("screen");

const ReferralModal = () => {
  const modal = useSelector((state) => state.alert.referralModal);
  const showBalances = useSelector((state) => state.oauth.showBalances);
  const userWalletBalance = useSelector((state) => state.wallet.userWalletBalance);
  const walletLoading = useSelector((state) => state.wallet.loading);
  const referrals = useSelector((state) => state.referrals.referrals);
  const referralLoading = useSelector((state) => state.referrals.loading);
  const theme = useSelector((state) => state.oauth.theme);

  const dispatch = useDispatch();

  const handleCopy = (refLink) => {
    copyLink(refLink);
    dispatch(
      setToastModal({
        status: true,
        message: "Referral link copied",
      }),
    );
    setTimeout(() => {
      dispatch(
        setToastModal({
          status: false,
          message: "",
        }),
      );
    }, 2500);
  };

  return (
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={() => {
        dispatch(setReferralModal(false));
      }}
    >
      <View style={{ flex: 1, backgroundColor: theme === "dark" ? colors.darkBody : "#f8f8f8" }}>
        <SvgComponent />
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => dispatch(setReferralModal(false))}
          />
          <Text style={[styles.modalHeaderText, { fontFamily: "PoppinsBold" }]}>Referrals</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[{ backgroundColor: colors.greenDarkColor }]}>
            <View style={[styles.modalSearchContainer]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.modalHeaderTex, walletLoading && { marginRight: 10 }]}>
                  {" "}
                  {userWalletBalance
                    ? showBalances
                      ? "NGN " + userWalletBalance?.commissionAvailableBalance + ".00"
                      : "*******"
                    : "NGN 0.00"}
                </Text>
                {walletLoading ? <ActivityIndicator size="small" color="#14961E" /> : null}
              </View>
              <Text style={[styles.modalHeaderTex, styles.modalHeaderText2, { fontWeight: "600" }]}>
                Referral Balance
              </Text>
            </View>
            <View style={[styles.modalSearchContainer]}>
              {referralLoading ? (
                <View style={{ alignItems: "center" }}>
                  <ActivityIndicator size="small" color="#14961E" />
                </View>
              ) : referrals && referrals?.link ? (
                <View style={[styles.modalSearch, theme === "dark" && globalStyles.containerDark]}>
                  <TextInput
                    style={[
                      styles.searchInput,
                      { textAlign: "left", alignItems: "flex-start", textAlignVertical: "top" },
                      theme === "dark" && globalStyles.textLight,
                    ]}
                    placeholder="referral link"
                    value={referrals?.link}
                  />
                  <TouchableOpacity
                    style={[styles.buttonCopy, { backgroundColor: colors.greenDarkColor }]}
                    onPress={() => handleCopy(referrals?.link)}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={styles.buttonCopyText}>Copy</Text>
                      <FeatherIcon name="copy" size={15} style={[{ color: "#fff", marginLeft: 6 }]} />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>

          {/* <View style={[styles.productContainer]}>
            <AllSavings />
          </View> */}
          <AllReferrals />
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
    fontSize: 15,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "PoppinsBold",
    color: "#fff",
    marginLeft: -45,
  },

  modalSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingVertical: 0,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 30,
  },

  modalHeaderTex: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 25,
    // lineHeight: 29,
    // marginTop: 10,
    fontFamily: "Montserrat",
    color: "#fff",
  },

  modalHeaderText2: {
    fontSize: 15,
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 100,
  },

  modalSearch: {
    width: "98%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  searchIcon: {
    marginRight: 15,
  },

  searchInput: {
    fontSize: 15,
    color: "#444",
    width: "72%",
    textAlign: "left",
  },

  buttonCopy: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonCopyText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default ReferralModal;
