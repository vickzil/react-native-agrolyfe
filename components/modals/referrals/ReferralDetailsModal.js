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
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReferralDetailsModal } from "../../../store/alert/alertSlice";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import AllReferrals from "../../referrals/AllReferrals";
import ReferralHeaderImageTop from "./ReferralHeaderImageTop";
import ReferralInvestment from "./ReferralInvestment";

const { width } = Dimensions.get("screen");

const ReferralDetailsModal = () => {
  const modal = useSelector((state) => state.alert.referralDetailsModal);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={modal?.status}
      animationType="slide"
      onRequestClose={() => {
        dispatch(
          setReferralDetailsModal({
            status: false,
            payload: null,
          }),
        );
      }}
    >
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() =>
              dispatch(
                setReferralDetailsModal({
                  status: false,
                  payload: null,
                }),
              )
            }
          />
          <Text style={styles.modalHeaderText}>Referrals Details</Text>
          <Text></Text>
        </View>
        <ScrollView>
          <View style={[{ backgroundColor: colors.greenDarkColor, paddingTop: 20, paddingBottom: 30 }]}>
            <ReferralHeaderImageTop />
          </View>

          <View style={[styles.productContainer]}>
            <ReferralInvestment />
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
