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
import React, { useEffect } from "react";

import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import AnimatedViewComp from "../../customs/AnimatedViewComp";

const { width } = Dimensions.get("screen");

const SelectProductModal = ({ data, closeModal, choosenProd, selectedProduct }) => {
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <Modal visible={data?.status} animationType="fade" onRequestClose={() => closeModal()}>
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={{ marginTop: -40 }}>
        <View style={[styles.modalHeader, { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>Select Product</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer, { marginTop: 0 }]}>
            {data && data?.data && data.data.length ? (
              <View>
                {data?.data.map((item, index) => (
                  <AnimatedViewComp index={index} key={index}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      key={index}
                      style={[
                        styles.container,
                        selectedProduct && selectedProduct.id == item.id ? styles.selectedItem : null,
                      ]}
                      onPress={() => choosenProd(item)}
                    >
                      <View style={styles.content} key={index}>
                        <Text style={[styles.contentText, styles.contentText1]}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </AnimatedViewComp>
                ))}
              </View>
            ) : (
              <View style={{ marginTop: 50 }}>
                <Text style={[styles.contentText, styles.contentText1]}>No package</Text>
              </View>
            )}
          </View>
        </ScrollView>
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
    elevation: 3,
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

  container: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 2,
    elevation: 2,
  },

  content: {
    width: "95%",
  },

  contentText: {
    fontFamily: "Poppins",
  },

  contentText1: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 5,
  },

  contentText2: {
    fontSize: 14,
    color: colors.greenColor,
  },

  selectedItem: {
    width: "97%",
    borderWidth: 3,
    borderColor: "#e79b0e",
    marginLeft: 5,
  },
});
export default SelectProductModal;
