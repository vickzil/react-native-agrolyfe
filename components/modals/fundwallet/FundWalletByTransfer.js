import React, { useEffect, useRef } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { globalStyles } from "../../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../styles/colors";
import { setFundwalletByLocalTransferModal } from "../../../store/alert/alertSlice";

const { height, width } = Dimensions.get("window");
const FundWalletByTransfer = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.alert.fundwalletByLocalTransferModal);
  // ref
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (modal) {
      bottomSheetRef.current.show();
    } else {
      bottomSheetRef.current.close();
      dispatch(setFundwalletByLocalTransferModal(false));
    }

    // console.log(modal);
    // console.log(height);
  }, [modal]);

  const closeFundModal = () => {
    bottomSheetRef.current.close();
    dispatch(setFundwalletByLocalTransferModal(false));
  };
  //   draggable={false}
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
      <BottomSheet
        ref={bottomSheetRef}
        draggable={false}
        onClose={() => closeFundModal()}
        onRequestClose={() => closeFundModal()}
        height={height}
      >
        <View style={[styles.modalHeader]}>
          <Icon
            name="chevron-left"
            size={40}
            style={[styles.modalHeaderIcon, { color: "#222", marginLeft: -10 }]}
            onPress={() => closeFundModal()}
          />
          <Text style={styles.modalHeaderText}></Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 12 }}>
          <View style={{ marginBottom: 40, marginTop: 0 }}>
            <Text
              style={[globalStyles.label, { fontSize: 22, textAlign: "left", marginBottom: 10, fontWeight: "900" }]}
            >
              Bank transfer (NGN)
            </Text>
            <Text style={[globalStyles.label, { fontSize: 15, textAlign: "left", marginBottom: 0, fontWeight: "600" }]}>
              Transfer money to any of the account numbers below to fund your stash
            </Text>
          </View>
          <Collapse style={{ marginBottom: 20 }}>
            <CollapseHeader style={{ flexDirection: "row", alignItems: "flex-start", padding: 0, marginBottom: 12 }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",

                  //   textAlign: "left",
                }}
              >
                <Text style={[globalStyles.label, { fontWeight: "700", fontSize: 19, color: colors.greenColor }]}>
                  Wema Bank
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <Text style={[globalStyles.label, { fontSize: 16, color: "#777" }]}>Account number</Text>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[globalStyles.label, { fontSize: 16, color: colors.greenDarkColor }]}>0725653778</Text>
                  <Ionicons
                    name="copy-outline"
                    size={19}
                    style={[styles.modalHeaderIcon, { color: "#111", padding: 0, marginLeft: 6, marginTop: -7 }]}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <Text style={[globalStyles.label, { fontSize: 16, color: "#777" }]}>Account Name</Text>
                <Text style={[globalStyles.label, { fontSize: 16 }]}>Victor Nwakwue</Text>
              </View>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20 }}>
            <CollapseHeader style={{ flexDirection: "row", alignItems: "flex-start", padding: 0, marginBottom: 12 }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",

                  //   textAlign: "left",
                }}
              >
                <Text style={[globalStyles.label, { fontWeight: "700", fontSize: 19, color: colors.greenColor }]}>
                  Sterling Bank
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <Text style={[globalStyles.label, { fontSize: 16, color: "#777" }]}>Account number</Text>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[globalStyles.label, { fontSize: 16, color: colors.greenDarkColor }]}>0725653778</Text>
                  <Ionicons
                    name="copy-outline"
                    size={19}
                    style={[styles.modalHeaderIcon, { color: "#111", padding: 0, marginLeft: 6, marginTop: -7 }]}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <Text style={[globalStyles.label, { fontSize: 16, color: "#777" }]}>Account Name</Text>
                <Text style={[globalStyles.label, { fontSize: 16 }]}>Victor Nwakwue</Text>
              </View>
            </CollapseBody>
          </Collapse>
        </ScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 10,
    marginBottom: 0,

    // elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
    color: "#fff",
    marginLeft: -45,
  },
});

export default FundWalletByTransfer;
