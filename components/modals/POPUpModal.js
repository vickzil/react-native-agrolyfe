import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../styles/colors";

import { SvgUri } from "react-native-svg";

const { width } = Dimensions.get("screen");

const POPUpModal = ({ visible, setVisible, children, modalTitle = "Select option", lightBackground }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setVisible(false);
  };
  const toggleModal = () => {
    if (visible === true) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  useEffect(() => {
    toggleModal();
  }, [visible]);

  return (
    <Modal
      visible={showModal}
      animationType="fade"
      onRequestClose={() => {
        closeModal();
      }}
      style={{ marginBottom: 0 }}
    >
      <View style={{ flex: 1, backgroundColor: "#f8f8f8", marginBottom: 0 }}>
        <View style={[lightBackground ? { backgroundColor: "#fff" } : { backgroundColor: colors.greenDarkColor }]}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="arrow-left"
              size={40}
              style={[styles.modalHeaderIcon, lightBackground ? { color: "#111" } : { color: "#fff" }]}
              onPress={() => closeModal()}
            />
            <Text style={[styles.modalHeaderText, lightBackground && { color: "#111" }]}>{modalTitle}</Text>
            <Text></Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            {children}

            {/* <Text>Here oo</Text> */}
          </View>
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
    paddingVertical: 7,
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
    letterSpacing: -0.35644,
    color: "#fff",
    marginLeft: -45,
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 0,
  },
});
export default POPUpModal;
