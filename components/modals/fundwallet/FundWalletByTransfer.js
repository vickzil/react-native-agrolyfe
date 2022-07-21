import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { globalStyles } from "../../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../styles/colors";
import { setFundwalletByLocalTransferModal, setToastModal } from "../../../store/alert/alertSlice";
import { copyLink } from "../../helpers/globalFunction";
import LoadingComponents from "../../loader/LoadingComponents";
import NoItem from "../../extra/NoItem";
import RenderHtml from "react-native-render-html";
import SvgComponent from "../../customs/SvgComponent";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";

const { height, width } = Dimensions.get("window");
const FundWalletByTransfer = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.alert.fundwalletByLocalTransferModal);
  const walletOptions = useSelector((state) => state.wallet.walletOptions);
  const loading = useSelector((state) => state.wallet.optionLoading);
  const theme = useSelector((state) => state.oauth.theme);
  const [localTransfer, setLocalTransfer] = useState(null);
  // ref
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (walletOptions) {
      setLocalTransfer(walletOptions.byLCYTransfer);
    }

    // console.log(modal);
    // console.log(height);
  }, [walletOptions]);

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
  const handleCopy = (refLink) => {
    copyLink(refLink);
    dispatch(
      setToastModal({
        status: true,
        message: "Account number copied...",
      }),
    );
    setTimeout(() => {
      dispatch(
        setToastModal({
          status: false,
          message: "",
        }),
      );
    }, 2500);
  };

  //   draggable={false}
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === "dark" ? colors.darkCard : "#fff" }]}>
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkCard} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <BottomSheet
        ref={bottomSheetRef}
        draggable={false}
        onClose={() => closeFundModal()}
        onRequestClose={() => closeFundModal()}
        height={height}
        sheetBackgroundColor={theme === "dark" ? colors.darkCard : "#fff"}
        radius={1}
      >
        <SvgComponent />
        <View style={[styles.modalHeader]}>
          <Icon
            name="chevron-left"
            size={40}
            style={[styles.modalHeaderIcon, { color: theme === "dark" ? "#fff" : "#222", marginLeft: -10 }]}
            onPress={() => closeFundModal()}
          />
          <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}></Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 12 }}>
          <View style={{ marginBottom: 40, marginTop: 0 }}>
            <Text
              style={[
                globalStyles.label,
                { fontSize: 18, textAlign: "left", marginBottom: 10, fontWeight: "600", fontFamily: "PoppinsBold" },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              Bank Transfer (NGN)
            </Text>
            <Text
              style={[
                globalStyles.label,
                { fontSize: 14, textAlign: "left", marginBottom: 0, fontWeight: "500" },
                theme === "dark" && globalStyles.textLightLight,
              ]}
            >
              {localTransfer ? localTransfer?.message : ""}
            </Text>
          </View>

          {loading ? (
            <View style={{ marginTop: 40 }}>
              <LoadingComponents />
            </View>
          ) : localTransfer && localTransfer.items && localTransfer.items.length ? (
            localTransfer?.items?.map((item, index) => (
              <Collapse
                key={index}
                style={{
                  marginBottom: 20,
                  borderBottomWidth: 2,
                  borderColor: theme === "dark" ? colors.greenLightDarkColor : "#e8e8e8",
                  paddingBottom: 0,
                }}
              >
                <CollapseHeader
                  style={{ flexDirection: "row", alignItems: "flex-start", padding: 0, marginBottom: 12 }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",

                      //   textAlign: "left",
                    }}
                  >
                    <Text
                      style={[
                        globalStyles.label,
                        { fontWeight: "600", fontSize: 15, color: theme === "dark" ? "white" : colors.greenColor },
                      ]}
                    >
                      {item.accountBank}
                    </Text>
                    <View style={{ alignItems: "flex-end" }}>
                      <Icon
                        name="chevron-down"
                        size={33}
                        style={[styles.modalHeaderIcon, { color: theme === "dark" ? "white" : "#111", padding: 2 }]}
                      />
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
                    <Text
                      style={[
                        globalStyles.label,
                        { fontSize: 14, color: theme === "dark" ? colors.greenLightDarkColor : "#777" },
                      ]}
                    >
                      Account number
                    </Text>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => handleCopy(item.accountNumber)}
                    >
                      <Text
                        style={[
                          globalStyles.label,
                          { fontSize: 14, color: theme === "dark" ? "#aaa" : colors.greenDarkColor },
                        ]}
                      >
                        {item.accountNumber}
                      </Text>
                      <Ionicons
                        name="copy-outline"
                        size={19}
                        style={[
                          styles.modalHeaderIcon,
                          { color: theme === "dark" ? "#aaa" : "#111", padding: 0, marginLeft: 6, marginTop: -7 },
                        ]}
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
                    <Text
                      style={[
                        globalStyles.label,
                        { fontSize: 14, color: theme === "dark" ? colors.greenLightDarkColor : "#777" },
                      ]}
                    >
                      currency
                    </Text>
                    <Text
                      style={[
                        globalStyles.label,
                        { fontSize: 14, marginRight: 10, color: theme === "dark" ? "#aaa" : "#777" },
                      ]}
                    >
                      {item.currency}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 16,
                    }}
                  >
                    <Text
                      style={[
                        globalStyles.label,
                        { fontSize: 14, color: theme === "dark" ? colors.greenLightDarkColor : "#777" },
                      ]}
                    >
                      Account Name
                    </Text>
                    <View style={{ width: "50%", alignItems: "flex-end", justifyContent: "flex-end" }}>
                      <Text
                        style={[
                          globalStyles.label,
                          {
                            textAlign: "right",
                            fontSize: 14,
                            marginRight: 10,
                            color: theme === "dark" ? "#aaa" : "#777",
                          },
                        ]}
                      >
                        {item.accountName}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-start",
                      marginBottom: 16,
                    }}
                  >
                    <View style={{ width: "100%" }}>
                      <Text
                        style={[
                          globalStyles.label,
                          { fontSize: 14, color: theme === "dark" ? colors.greenLightDarkColor : "#777" },
                        ]}
                      >
                        Message
                      </Text>
                      {/* <Text style={[globalStyles.label, { textAlign: "left", fontSize: 14, marginRight: 10 }]}>
                        {item.message}
                      </Text> */}
                      <RenderHtml
                        style={[globalStyles.label, { textAlign: "left", fontSize: 14, marginRight: 10 }]}
                        contentWidth={width}
                        source={{ html: item.message }}
                        tagsStyles={{
                          p: { color: theme === "dark" && "white" },
                          a: { color: theme === "dark" && "white" },
                          span: { color: theme === "dark" && "white" },
                        }}
                      />
                    </View>
                  </View>
                </CollapseBody>
              </Collapse>
            ))
          ) : (
            <View style={{ marginTop: 40 }}>
              <NoItem item={{ type: "BANK", buttonText: "", message: "No local bank transfer option available" }} />
            </View>
          )}
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
