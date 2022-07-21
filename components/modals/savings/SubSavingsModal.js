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
import { setSubCategorySavingsModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import IconSearch from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SavingsCard from "../../savings/SavingsCard";
import { globalStyles } from "../../../styles/global";

const { width } = Dimensions.get("screen");

const SubSavingsModal = () => {
  const modal = useSelector((state) => state.alert.subCategorySavingsModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={modal?.status}
      animationType="slide"
      onRequestClose={() => {
        dispatch(
          setSubCategorySavingsModal({
            status: false,
            payload: null,
          }),
        );
      }}
    >
      <View style={[{ flex: 1 }, theme === "dark" ? globalStyles.containerDark : { backgroundColor: "#fff" }]}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() =>
              dispatch(
                setSubCategorySavingsModal({
                  status: false,
                  payload: null,
                }),
              )
            }
          />
          <Text style={styles.modalHeaderText}> {modal?.payload ? modal?.payload?.name : "Sub Category "}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={[styles.modalSearchContainer]}>
            <View style={[styles.modalSearch]}>
              <IconSearch name="search1" size={20} style={[styles.searchIcon, { color: colors.greenColor }]} />
              <TextInput style={styles.searchInput} placeholder="Search..." />
            </View>
          </View> */}
          <View style={{ marginTop: 30 }}>
            <Text
              style={[
                {
                  marginTop: 0,
                  textAlign: "center",
                  fontFamily: "PoppinsBold",
                  fontSize: 17,
                  fontWeight: "600",
                  marginBottom: 40,
                },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              Choose a {modal?.payload ? modal?.payload?.code : "Sub "} plan
            </Text>
          </View>
          <View style={[styles.productContainer, { marginTop: 10 }]}>
            {modal?.payload?.savingsCategories?.map((item, index) => (
              <SavingsCard key={index} item={item} category={modal?.payload} />
            ))}
          </View>
        </ScrollView>
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
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "PoppinsBold",
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

export default SubSavingsModal;
