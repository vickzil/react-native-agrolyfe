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
import { setReferralModal } from "../../../store/alert/alertSlice";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import AllReferrals from "../../referrals/AllReferrals";

const { width } = Dimensions.get("screen");

const ReferralModal = () => {
  const modal = useSelector((state) => state.alert.referralModal);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={() => {
        dispatch(setReferralModal(false));
      }}
    >
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => dispatch(setReferralModal(false))}
          />
          <Text style={styles.modalHeaderText}>Referrals</Text>
          <Text></Text>
        </View>
        <ScrollView>
          <View style={[{ backgroundColor: colors.greenDarkColor }]}>
            <View style={[styles.modalSearchContainer]}>
              <Text style={styles.modalHeaderTex}>NGN 0.00</Text>
              <Text style={[styles.modalHeaderTex, styles.modalHeaderText2]}>Referral Balance</Text>
            </View>
            <View style={[styles.modalSearchContainer]}>
              <View style={[styles.modalSearch]}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  value="https://dashboard.oxfordvest.com/register?code=OIG-00424"
                />
                <TouchableOpacity style={[styles.buttonCopy, { backgroundColor: colors.greenDarkColor }]}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.buttonCopyText}>Copy</Text>
                    <FeatherIcon name="copy" size={15} style={[{ color: "#fff", marginLeft: 6 }]} />
                  </View>
                </TouchableOpacity>
              </View>
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
    fontSize: 29,
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
export default ReferralModal;
