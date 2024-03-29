import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSavingsModal } from "../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../../../styles/colors";
import AllSavings from "../../savings/AllSavings";
import { globalStyles } from "../../../styles/global";
import SvgComponent2 from "../../customs/SvgComponent2";

const { width } = Dimensions.get("screen");

const SavingsModal = () => {
  const modal = useSelector((state) => state.alert.savingsModal);
  const user = useSelector((state) => state.oauth.user);
  const loading = useSelector((state) => state.oauth.loading);
  const showBalances = useSelector((state) => state.oauth.showBalances);

  const theme = useSelector((state) => state.oauth.theme);

  const dispatch = useDispatch();

  return (
    <Modal
      visible={modal}
      animationType="fade"
      onRequestClose={() => {
        dispatch(setSavingsModal(false));
      }}
    >
      {modal && (
        <View>
          <StatusBar backgroundColor={colors.greenDarkColor} barStyle={"light-content"} />
        </View>
      )}
      <View style={[{ flex: 1 }, theme === "dark" ? globalStyles.containerDark : { backgroundColor: "#f8f8f8" }]}>
        <SvgComponent2 />
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => dispatch(setSavingsModal(false))}
          />
          <Text style={styles.modalHeaderText}>Savings</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.modalSearchContainer, { backgroundColor: colors.greenDarkColor }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.modalHeaderTex, loading && { marginRight: 10 }]}>
                {" "}
                {showBalances
                  ? user?.totalSavingsBalance
                    ? "NGN " + user?.totalSavingsBalance + ".00"
                    : "NGN 0.00"
                  : "******"}
              </Text>
              {loading ? <ActivityIndicator size="small" color="#14961E" /> : null}
            </View>
            <Text style={[styles.modalHeaderTex, styles.modalHeaderText2, { fontWeight: "600" }]}>Savings Balance</Text>
          </View>

          {/* <View style={[styles.productContainer]}>
            <AllSavings />
          </View> */}
          <AllSavings />
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
    fontSize: 18,
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
});
export default SavingsModal;
