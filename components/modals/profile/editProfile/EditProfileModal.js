import { Dimensions, Keyboard, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEditProfileModal } from "../../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../styles/colors";
import EditProfileHeaderImageTop from "./EditProfileHeaderImageTop";
import EditProfileForm from "./EditProfileForm";
import ScreenLoading from "../../../loader/ScreenLoading";
import SvgComponent from "../../../customs/SvgComponent";
import { globalStyles } from "../../../../styles/global";

const { width } = Dimensions.get("screen");
let screenHeight = Dimensions.get("window").height;

const EditProfileModal = () => {
  const modal = useSelector((state) => state.alert.editProfileModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState({
    status: false,
    message: "Please wait...",
  });

  const closeModal = () => {
    if (isLoading) {
      return;
    }
    dispatch(setEditProfileModal(false));
  };

  const handleLoading = (status) => {
    Keyboard.dismiss();
    setScreenLoading({
      status: status,
      message: "Please wait...",
    });
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeModal()}>
      <SvgComponent />
      <ScreenLoading visibility={screenLoading} />
      <View style={[{ flex: 1 }, theme === "dark" ? globalStyles.containerDark : { backgroundColor: "#fff" }]}>
        <View style={[styles.modalHeader, { backgroundColor: colors.greenDarkColor }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#fff" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>Edit Profile</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[{ backgroundColor: colors.greenDarkColor, paddingTop: 20, paddingBottom: 30 }]}>
            <EditProfileHeaderImageTop handleLoading={handleLoading} />
          </View>

          <View style={[styles.productContainer]}>
            <EditProfileForm handleLoading={handleLoading} theme={theme} />
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
    fontSize: 19,
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
export default EditProfileModal;
