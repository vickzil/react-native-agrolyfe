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
import { setAllProductModal, setMyPurchasesModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconSearch from "react-native-vector-icons/AntDesign";
import { products } from "../../../constant/products";
import PurchaseCard from "../../products/PurchaseCard";

const { width } = Dimensions.get("screen");

const MyPurchasesModal = () => {
  const modal = useSelector((state) => state.alert.myPurchasesModal);
  const dispatch = useDispatch();

  // const handleShowAllProducts = () => {
  //   dispatch(setAllProductModal(true));
  //   dispatch(setMyPurchasesModal(false));
  // };

  return (
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={() => {
        dispatch(setMyPurchasesModal(false));
      }}
    >
      <View>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => dispatch(setMyPurchasesModal(false))}
          />
          <Text style={styles.modalHeaderText}>My Purchases</Text>
          <Text></Text>
        </View>
        <ScrollView>
          <View style={[styles.productContainer]}>
            {products?.map((item, index) => (
              <PurchaseCard key={index} item={item} index={index} />
            ))}
          </View>
        </ScrollView>

        {/* <TouchableOpacity
          onPress={() => handleShowAllProducts()}
          style={[styles.buttonFloat, { backgroundColor: colors.greenColor }]}
        >
          <Text style={styles.buttonFloatText}>Initiate Purchase</Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    color: "#fff",
    marginLeft: -30,
  },

  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 90,
    marginTop: 15,
    backgroundColor: "#f7f7f7",
  },

  buttonFloat: {
    position: "absolute",
    right: 10,
    bottom: 120,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 80,
    elevation: 5,
  },

  buttonFloatText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    color: "#fff",
  },
});
export default MyPurchasesModal;
