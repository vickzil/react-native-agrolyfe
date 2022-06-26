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
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllProductModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AllProducts from "../../products/AllProducts";
import MyProducts from "../../products/MyProducts";
import FadeInView from "../../customs/FadeInView";

const { width } = Dimensions.get("screen");

const ProductsModal = () => {
  const [toggleButton, setToggleButton] = useState("ALL_PRODUCTS");

  const modal = useSelector((state) => state.alert.allProductModal);
  const dispatch = useDispatch();
  const scrollViewRef = useRef();

  const closeModal = () => {
    dispatch(setAllProductModal(false));
    setToggleButton("ALL_PRODUCTS");
    // dispatch(setAllProductModal(false));
  };

  // useScrollToTop(
  //   useRef({
  //     scrollToTop: () => ref.current?.scrollToOffset({ offset: -100 }),
  //   }),
  // );

  const changeTable = (value) => {
    setToggleButton(value);

    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
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
        closeModal();
      }}
    >
      <View>
        <View style={{ backgroundColor: colors.greenDarkColor }}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="arrow-left"
              size={25}
              style={[styles.modalHeaderIcon, { color: "#fff" }]}
              onPress={() => closeModal()}
            />
            <Text style={styles.modalHeaderText}>
              {toggleButton === "ALL_PRODUCTS" ? "All Products" : "My Products"}
            </Text>
          </View>

          <View style={[styles.modalTopp]}>
            <View>
              <TouchableOpacity
                onPress={() => changeTable("ALL_PRODUCTS")}
                style={[styles.topButton, styles.topButton1, toggleButton === "ALL_PRODUCTS" && styles.activeButton]}
              >
                <Text style={[styles.topButtonText, toggleButton === "ALL_PRODUCTS" && styles.activeButtonText]}>
                  All products
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{}}>
              <TouchableOpacity
                onPress={() => changeTable("MY_PRODUCTS")}
                style={[styles.topButton, styles.topButton2, toggleButton === "MY_PRODUCTS" && styles.activeButton]}
              >
                <Text style={[styles.topButtonText, toggleButton === "MY_PRODUCTS" && styles.activeButtonText]}>
                  My Purchases
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            {toggleButton === "ALL_PRODUCTS" ? <AllProducts /> : <MyProducts />}
          </View>
        </ScrollView>

        {/* <TouchableOpacity
          style={[styles.buttonFloat, { backgroundColor: colors.greenColor }]}
          onPress={handleShowMyProducts}
        >
          <Text style={styles.buttonFloatText}>My Purchases</Text>
        </TouchableOpacity> */}
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

  modalTopp: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 24,
    marginBottom: 20,
  },

  topButton: {
    // width: "47%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#fff",
  },

  topButton1: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  topButton2: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  activeButton: {
    backgroundColor: "#25453b",
    // margin: 2,
  },

  activeButtonText: {
    color: "#fff",
    fontWeight: "600",
    // margin: 2,
  },

  topButtonText: {
    // color: "#555",
    textAlign: "center",
    textAlignVertical: "top",
    fontSize: 16,
  },

  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 140,
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
export default ProductsModal;
