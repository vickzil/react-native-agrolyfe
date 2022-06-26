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
import ProductCard from "../../products/ProductCard";

const { width } = Dimensions.get("screen");

const AllProductsModal = () => {
  const modal = useSelector((state) => state.alert.allProductModal);
  const dispatch = useDispatch();

  const handleShowMyProducts = () => {
    dispatch(setMyPurchasesModal(true));
    // dispatch(setAllProductModal(false));
  };

  return (
    // <GestureRecognizer
    //   style={{ flex: 1 }}
    //   onSwipeUp={() => dispatch(setAllProductModal(true))}
    //   onSwipeDown={() => dispatch(setAllProductModal(false))}
    // >
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={() => {
        dispatch(setAllProductModal(false));
      }}
    >
      <View>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => dispatch(setAllProductModal(false))}
          />
          <Text style={styles.modalHeaderText}>All Products</Text>
        </View>
        <ScrollView>
          <View style={[styles.modalSearchContainer, { backgroundColor: colors.greenDarkColor }]}>
            <View style={[styles.modalSearch]}>
              <IconSearch
                name="search1"
                size={20}
                style={[styles.searchIcon, { color: colors.greenColor }]}
                onPress={() => goBack()}
              />
              <TextInput style={styles.searchInput} placeholder="Search products" />
            </View>
          </View>
          <View style={[styles.productContainer]}>
            {products?.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.buttonFloat, { backgroundColor: colors.greenColor }]}
          onPress={handleShowMyProducts}
        >
          <Text style={styles.buttonFloatText}>My Purchases</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
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
  },

  modalSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 30,
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
  },

  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 90,
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
export default AllProductsModal;
