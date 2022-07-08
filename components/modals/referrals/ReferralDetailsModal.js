import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlertModal, setReferralDetailsModal, setToastModal } from "../../../store/alert/alertSlice";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import AllReferrals from "../../referrals/AllReferrals";
import ReferralHeaderImageTop from "./ReferralHeaderImageTop";
import ReferralInvestment from "./ReferralInvestment";
import axios from "axios";

const { width } = Dimensions.get("screen");

const ReferralDetailsModal = () => {
  const modal = useSelector((state) => state.alert.referralDetailsModal);
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  const dispatch = useDispatch();

  const [referralInvesment, setReferralInvesment] = useState([]);
  const [loadingReferrals, setLoadingReferrals] = useState(true);

  useEffect(() => {
    if (modal?.status === true && modal?.payload) {
      if (referralInvesment.length <= 0) {
        getRefferalInvestments();
      }
    }
  }, [modal]);

  const closeModal = () => {
    setReferralInvesment([]);
    setLoadingReferrals(true);
    dispatch(
      setReferralDetailsModal({
        status: false,
        payload: null,
      }),
    );
  };

  const getRefferalInvestments = () => {
    setLoadingReferrals(true);

    setTimeout(() => {
      let payload = {
        AppId: AppId,
        RequestId: RequestId,
        UserCode: modal?.payload?.code,
        PageNumber: 1,
        PageSize: 200,
      };

      axios
        .post(`${baseURL}/v1.0/Dashboard/portfolio`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
          },
        })
        .then((response) => {
          // console.log(response?.data);

          if (response?.data?.success == true) {
            // console.log(response.data);
            setReferralInvesment(response?.data?.data?.investmentInfo?.activeUserInvestments);
            setLoadingReferrals(false);
          } else {
            setLoadingReferrals(false);
            setReferralInvesment([]);
            dispatch(
              setToastModal({
                status: true,
                message: response?.data?.message,
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

            // dispatch(
            //   setAlertModal({
            //     status: true,
            //     type: "error",
            //     title: " Error",
            //     des: response.data.message,
            //     payload: null,
            //   }),
            // );
          }
        })
        .catch(() => {
          setLoadingReferrals(false);
          setReferralInvesment([]);

          dispatch(
            setAlertModal({
              status: true,
              type: "error",
              title: "Service Error",
              des: "Service is temporarily unavailable. Please try again in a few minutes.",
              payload: null,
            }),
          );
        });
    }, 2000);
  };

  return (
    <Modal visible={modal?.status} animationType="slide" onRequestClose={() => closeModal()}>
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => closeModal()}
          />
          <Text style={[styles.modalHeaderText, { textTransform: "uppercase" }]}>
            {modal?.payload ? modal?.payload?.firstName + "'s " : "Referrals"} Details
          </Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[{ backgroundColor: colors.greenDarkColor, paddingTop: 20, paddingBottom: 30 }]}>
            <ReferralHeaderImageTop item={modal?.payload} />
          </View>

          <View style={[styles.productContainer]}>
            <ReferralInvestment item={modal?.payload} investments={referralInvesment} loading={loadingReferrals} />
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
    fontSize: 27,
    lineHeight: 29,
    marginTop: 10,
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
    fontSize: 16,
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
export default ReferralDetailsModal;
