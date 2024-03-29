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
import { setCardModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Cards from "./Cards";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import SvgComponent2 from "../../customs/SvgComponent2";
import { globalStyles } from "../../../styles/global";

const { width } = Dimensions.get("screen");

const CardModal = () => {
  const modal = useSelector((state) => state.alert.cardModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={() => {
        dispatch(setCardModal(false));
      }}
    >
      <SvgComponent2 />
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkCard} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <View
        style={[
          { flex: 1, marginTop: -40 },
          theme === "dark" ? globalStyles.containerDark : { backgroundColor: "#fff" },
        ]}
      >
        <View style={[styles.modalHeader, { backgroundColor: theme === "dark" ? colors.darkCard : "#fff" }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: theme === "dark" ? "#fff" : "#222" }]}
            onPress={() => dispatch(setCardModal(false))}
          />
          <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}>Cards</Text>
          <Text></Text>
        </View>
        <Cards />
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
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "PoppinsBold",
    color: "#222",
    marginLeft: -45,
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
});
export default CardModal;
