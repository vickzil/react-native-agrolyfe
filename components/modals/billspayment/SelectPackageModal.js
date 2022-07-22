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
import { useSelector } from "react-redux";
import { globalStyles } from "../../../styles/global";

const { width } = Dimensions.get("screen");

const SelectPackageModal = ({ data, closeModal, choosenPage, selectedPackage }) => {
  const theme = useSelector((state) => state.oauth.theme);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <Modal visible={data?.status} animationType="fade" onRequestClose={() => closeModal()}>
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkBody} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <View
        style={[
          { flex: 1, marginTop: -40 },
          theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
        ]}
      >
        <View style={[styles.modalHeader, theme === "dark" ? globalStyles.containerDark : { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, theme === "dark" ? globalStyles.textLight : { color: "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}>Select Package</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer, { marginTop: 0 }]}>
            {data && data?.data && data.data.length ? (
              <View style={{ paddingHorizontal: 10 }}>
                {data?.data.map((item, index) => (
                  <AnimatedViewComp index={index} key={index}>
                    <TouchableOpacity
                      style={[
                        styles.container,
                        selectedPackage && selectedPackage?.code == item.code ? styles.selectedItem : null,
                        theme === "dark" && globalStyles.cardDark,
                        theme === "dark" && { marginBottom: 5, borderBottomWidth: 0 },
                      ]}
                      onPress={() => choosenPage(item)}
                    >
                      <View style={styles.content}>
                        <Text
                          style={[styles.contentText, styles.contentText1, theme === "dark" && globalStyles.textLight]}
                        >
                          {item?.name}
                        </Text>
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
    // elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 18,
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
    // elevation: 2,
    // borderBottomWidth: 1,
    // borderBottomColor: "#e9e6e6",
  },

  content: {
    width: "95%",
  },

  contentText: {
    fontFamily: "Poppins",
  },

  contentText1: {
    fontSize: 15,
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
export default SelectPackageModal;
