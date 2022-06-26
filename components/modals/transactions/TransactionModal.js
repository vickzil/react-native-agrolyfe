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
import { setTransactionModal } from "../../../store/alert/alertSlice";
import IconSearch from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AllTransactions from "../../transactions/AllTransactions";
import colors from "../../../styles/colors";

const { width } = Dimensions.get("screen");

const TransactionModal = () => {
  const modal = useSelector((state) => state.alert.transactionModal);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={() => {
        dispatch(setTransactionModal(false));
      }}
    >
      <View>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => dispatch(setTransactionModal(false))}
          />
          <Text style={styles.modalHeaderText}>Transactions</Text>
          <Text></Text>
        </View>
        <ScrollView>
          <View style={[styles.modalSearchContainer, { backgroundColor: colors.greenDarkColor }]}>
            <Text style={styles.modalHeaderTex}>NGN 0.00</Text>
            <Text style={[styles.modalHeaderTex, styles.modalHeaderText2]}>Main Balance</Text>
          </View>
          <View style={[styles.productContainer]}>
            <AllTransactions />
          </View>
        </ScrollView>

        {/* <Cards /> */}
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
    // lineHeight: 29,
    marginTop: 0,
    fontFamily: "Montserrat",
    color: "#fff",
  },

  modalHeaderText2: {
    fontSize: 16,
  },

  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: 30,
    paddingBottom: 100,
  },
});
export default TransactionModal;
