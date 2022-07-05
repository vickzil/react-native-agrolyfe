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
import { setMySavingsModal, setSavingsModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import IconSearch from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MySavingsCard from "../../savings/MySavingsCard";

const { width } = Dimensions.get("screen");

const MySavingsModal = () => {
  const modal = useSelector((state) => state.alert.mySavingsModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setMySavingsModal(false));
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeModal()}>
      <View>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>My Savings</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.modalSearchContainer]}>
            <View style={[styles.modalSearch]}>
              <IconSearch name="search1" size={20} style={[styles.searchIcon, { color: colors.greenColor }]} />
              <TextInput style={styles.searchInput} placeholder="Search..." />
            </View>
          </View>
          <View style={[styles.productContainer]}>
            {/* {savings?.map((item, index) => (
              
            ))} */}
            <MySavingsCard />
            <MySavingsCard />
            <MySavingsCard />
            <MySavingsCard />
            <MySavingsCard />
          </View>
        </ScrollView>

        <TouchableOpacity style={[styles.buttonFloat]}>
          <Text
            style={styles.buttonFloatText}
            onPress={() => {
              dispatch(setSavingsModal(true));
              closeModal();
            }}
          >
            <MaterialIcons name="add" size={40} style={[{ color: "#fff" }]} />
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
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
    right: 18,
    bottom: 120,
    // paddingVertical: 10,
  },

  buttonFloatText: {
    backgroundColor: colors.greenColor,
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "normal",
    fontWeight: "700",
    margin: 0,
    fontFamily: "Poppins",
    color: "#fff",
    padding: 15,
    borderRadius: 80,
    elevation: 1,
  },
});

export default MySavingsModal;
