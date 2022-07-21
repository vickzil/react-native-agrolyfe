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
import { setPurchaseDetailsModal } from "../../../store/alert/alertSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PurchasedModalItem from "./PurchasedModalItem";
import colors from "../../../styles/colors";
import { globalStyles } from "../../../styles/global";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";

const { width } = Dimensions.get("screen");

const PurchaseDetailsModal = () => {
  const modal = useSelector((state) => state.alert.purchaseDetailsModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setPurchaseDetailsModal({
        status: false,
        payload: null,
      }),
    );
  };

  return (
    <Modal
      visible={modal?.status}
      animationType="slide"
      onRequestClose={() => {
        dispatch(
          setPurchaseDetailsModal({
            status: false,
            payload: null,
          }),
        );
      }}
    >
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkCard} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}
      <View
        style={[
          { flex: 1, marginTop: -40 },
          theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
        ]}
      >
        <View style={[styles.modalHeader, { backgroundColor: theme === "dark" ? colors.darkCard : "#fff" }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: theme === "dark" ? "#fff" : "#222" }]}
            onPress={() =>
              dispatch(
                setPurchaseDetailsModal({
                  status: false,
                  payload: null,
                }),
              )
            }
          />
          <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}> Purchase Details</Text>
          <Text></Text>
        </View>

        <PurchasedModalItem item={modal?.payload} />

        {/* <Banks /> */}
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
    // elevation: 2,
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
    color: "#333",
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
export default PurchaseDetailsModal;
