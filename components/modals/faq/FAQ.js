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
import { useDispatch, useSelector } from "react-redux";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { setFaqModal } from "../../../store/alert/alertSlice";
import SvgComponent from "../../customs/SvgComponent";
import { globalStyles } from "../../../styles/global";
import colors from "../../../styles/colors";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";

const { height, width } = Dimensions.get("window");
const FAQModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.alert.faqModal);

  const closeModal = () => {
    dispatch(setFaqModal(false));
  };

  //   draggable={false}
  return (
    <Modal
      isVisible={modal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={100}
      onBackButtonPress={() => closeModal()}
      onBackdropPress={() => closeModal()}
      onSwipeComplete={() => closeModal()}
      // swipeDirection="right"
      style={{ width: width, height: height, margin: 0, padding: 0, backgroundColor: "#fff" }}
    >
      <SvgComponent />
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={[styles.modalHeader, { marginTop: -40 }]}>
        <Icon
          name="chevron-left"
          size={40}
          style={[styles.modalHeaderIcon, { color: "#222", marginLeft: -10 }]}
          onPress={() => closeModal()}
        />
        <Text style={styles.modalHeaderText}>FAQ</Text>
        <Text></Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 12, paddingRight: 0 }}>
        <View style={{ marginBottom: 40, marginTop: 10 }}>
          {/* <Text style={[globalStyles.label, { fontSize: 14, textAlign: "center", marginBottom: 0, fontWeight: "500" }]}>
            Everything you need to know to get started
          </Text> */}
        </View>
        <View style={{ width: "100%", paddingBottom: 140 }}>
          <Collapse style={{ marginBottom: 20, borderBottomWidth: 2, borderColor: "#f1f1f1", paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  What is AgroLyfe?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                AgroLyfe is a product that leverages farming and real estate to generate steady rental income for anyone
                through farmland acquisition.{" "}
              </Text>

              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                This product is designed to create earnings for people by leveraging land’s abundance, appreciation, and
                lasting nature. Think of it as{" "}
                <Text style={{ fontFamily: "PoppinsBold" }}>
                  {" "}
                  “buy land, rent out to farmers for farming and earn rent at short intervals”.
                </Text>
              </Text>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20, borderBottomWidth: 2, borderColor: "#f1f1f1", paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  How many acres of land are available?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                Our projection is <Text style={{ fontFamily: "PoppinsBold" }}> 10 million acres,</Text> with a presence
                across the <Text style={{ fontFamily: "PoppinsBold" }}> 36 states of Nigeria,</Text> and beyond.
              </Text>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20, borderBottomWidth: 2, borderColor: "#f1f1f1", paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  What documents will i get after purchasing the land?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                Deed of purchase and lease/rental agreement with the farmers.
              </Text>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20, borderBottomWidth: 2, borderColor: "#f1f1f1", paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  Are there hidden charges or costs?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                Only 10% agency and legal fees are applicable.
              </Text>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20, borderBottomWidth: 2, borderColor: "#f1f1f1", paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  How is my land purchase secured?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                In addition to the documents you will receive, we will issue you a post-dated cheque of the buying value
                of the purchased farmland.
              </Text>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20, borderBottomWidth: 2, borderColor: "#f1f1f1", paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  What are the rates of purchasing these farmlands?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                You can purchase from as low as ₦100,000 to ₦200,000.
              </Text>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20, borderBottomWidth: 2, borderColor: "#f1f1f1", paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  How often would i get my rental income?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                The rental income is the spread of your returns/earnings on the farmland, paid every 3 MONTHS (90 days)
                for the duration of your ownership.
              </Text>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20, borderBottomWidth: 2, borderColor: "#f1f1f1", paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  How long can i own a farmland for?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                The minimum duration to own farmland is 12 MONTHS, but renewable afterward.
              </Text>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20, borderBottomWidth: 2, borderColor: "#f1f1f1", paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  Can I fund my wallet until it reaches my savings goal?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                Yes you can. You can fund your wallet anytime you wish to, daily, weekly or monthly until it reaches
                your set amount.
              </Text>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                Once your set goal has been achieved, you can now make use of the funds.
              </Text>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20, borderBottomWidth: 2, borderColor: "#f1f1f1", paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  Can I pay directly in USD, EUR or GBP?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                Yes you can. Partners in the diaspora (also in Nigeria) can also have their wallets funded by making
                bank transfers to any of the Foreign Currency Accounts (FCA) as shown when you login to your dashboard.
              </Text>
            </CollapseBody>
          </Collapse>
          <Collapse style={{ marginBottom: 20, paddingBottom: 0 }}>
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
                <Text
                  style={[
                    globalStyles.label,
                    {
                      fontWeight: "600",
                      fontSize: 16,
                      color: colors.greenNormalColor,
                      fontFamily: "PoppinsBold",
                      width: "90%",
                    },
                  ]}
                >
                  How do I partner from overseas online?
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="chevron-down" size={33} style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]} />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                There is an indemnity contract sent via mail to ALL our customers/partners after investment has been
                successfully initiated on the platform.
              </Text>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                This contract binds our partners and us all through the tenure.
              </Text>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                This is very possible, All you need do is just to make payment to the acocunt that is generated for you
                after registration.
              </Text>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                This transfer can be done through platforms such as Sendwave, Azimo etc. You can also attempt to make
                use of a valid debit/credit card for this.
              </Text>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                If you are still unable to transfer, kindly reach out to us through any of our channels and we will be
                glad to assist you through the process.
              </Text>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                <Text style={{ fontFamily: "PoppinsBold" }}>Phone:</Text> +234 704 928 1351, +234 803 883 2695, +234 813
                621 0521, +234 802 339 7767, +234 806 494 4202.
              </Text>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                <Text style={{ fontFamily: "PoppinsBold" }}>Email:</Text> contact@agrolyfe.com
              </Text>
              <Text style={[globalStyles.label, { fontSize: 14.5, marginRight: 10 }]}>
                We are also working on integrating global payment systems to make payments more seemless for our foreign
                partners online.
              </Text>
            </CollapseBody>
          </Collapse>
        </View>
      </ScrollView>
    </Modal>
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
    color: "#222",
    marginLeft: -45,
  },
});

export default FAQModal;
