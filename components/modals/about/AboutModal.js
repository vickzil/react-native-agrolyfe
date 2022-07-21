import { Dimensions, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { setAboutModal } from "../../../store/alert/alertSlice";
import { globalStyles } from "../../../styles/global";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeAdverts from "../../home/HomeAdverts";

const { width } = Dimensions.get("window");
const banner = require("../../../assets/img/ad2.jpg");

const imageBanner = require("../../../assets/img/ad5.jpg");

const AboutModal = () => {
  const modal = useSelector((state) => state.alert.aboutModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setAboutModal(false));
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeModal()}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, backgroundColor: theme === "dark" ? colors.darkBody : "#f8f8f8" }}>
        <View
          style={[
            {
              height: "22%",
              position: "relative",
            },
          ]}
        >
          <View style={[styles.modalHeader]}>
            <Icon
              name="window-close"
              size={33}
              style={[styles.modalHeaderIcon, { color: "#fff" }]}
              onPress={() => closeModal()}
            />
            <Text style={styles.modalHeaderText}></Text>
            <Text></Text>
          </View>
          <Image
            source={banner}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              zIndex: 9,
            }}
          ></Image>
          <LinearGradient
            colors={["rgba(0,0,0,0.45)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.75)"]}
            style={{
              flex: 1,
              position: "absolute",
              width,
              height: "100%",
              zIndex: 10,
            }}
          />

          <View
            style={{
              flex: 1,
              position: "absolute",
              top: 60,
              width,
              paddingHorizontal: 30,
              zIndex: 20,
            }}
          >
            <Text
              style={{ color: "#fff", fontWeight: "600", fontSize: 25, textAlign: "center", fontFamily: "PoppinsBold" }}
            >
              About Agrolyfe
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 12, paddingRight: 0 }}>
          <View style={{ paddingTop: 20, paddingBottom: 30 }}>
            <Text
              style={[
                globalStyles.label,
                {
                  fontWeight: "600",
                  fontSize: 19,
                  color: theme === "dark" ? "#fff" : colors.greenDarkColor,
                  fontFamily: "PoppinsBold",
                },
              ]}
            >
              We equip growing farmers affordable arable lands.
            </Text>
            <Text
              style={[
                globalStyles.label,
                { fontSize: 15, marginRight: 10, lineHeight: 29 },
                theme === "dark" && globalStyles.textLightLight,
              ]}
            >
              AgroLyfe is a social entrepreneurial organization driven as a catalyst for change, enabling disadvantaged
              farmers, young Agricultural Professionals and enthusiasts to thrive in farming by providing arable, secure
              and purpose-built farmlands for possibility of achieving sustainable food security in Nigeria first, and
              the rest of Africa.
            </Text>
            <Text
              style={[
                globalStyles.label,
                { fontSize: 15, marginRight: 10, lineHeight: 29 },
                theme === "dark" && globalStyles.textLightLight,
              ]}
            >
              We leverage on technology and real estate to connect farmers with easy access to arable and secure
              purpose-built farm lands for rental period of a year with opportunities to renew their land rental
              duration, partake in Farmers Co-operative society membership for access to both financial and technical
              needs.
            </Text>

            <View style={{ marginTop: 20, marginBottom: 0, paddingRight: 12 }}>
              <Image source={imageBanner} style={{ width: "100%", height: 300, borderRadius: 10 }} resizeMode="cover" />
            </View>

            <Text
              style={[
                globalStyles.label,
                {
                  fontWeight: "600",
                  fontSize: 18,
                  color: theme === "dark" ? "#fff" : colors.greenDarkColor,
                  fontFamily: "PoppinsBold",
                  marginTop: 40,
                  paddingHorizontal: 5,
                  marginBottom: 0,
                },
              ]}
            >
              Vision
            </Text>
            <Text
              style={[
                globalStyles.label,
                { fontSize: 15, marginRight: 10, marginBottom: 0 },
                theme === "dark" && globalStyles.textLightLight,
              ]}
            >
              Equip Farmers of all ages, enable thriving Agriculture.
            </Text>

            <Text
              style={[
                globalStyles.label,
                {
                  fontWeight: "600",
                  fontSize: 18,
                  color: theme === "dark" ? "#fff" : colors.greenDarkColor,
                  fontFamily: "PoppinsBold",
                  marginTop: 30,
                  paddingHorizontal: 5,
                  marginBottom: 0,
                },
              ]}
            >
              Mission
            </Text>
            <Text
              style={[
                globalStyles.label,
                { fontSize: 15, marginRight: 10, marginBottom: 0 },
                theme === "dark" && globalStyles.textLightLight,
              ]}
            >
              To make Farmers own farmlands anywhere in the world.
            </Text>

            <Text
              style={[
                globalStyles.label,
                {
                  fontWeight: "600",
                  fontSize: 18,
                  color: theme === "dark" ? "#fff" : colors.greenDarkColor,
                  fontFamily: "PoppinsBold",
                  marginTop: 30,
                  paddingHorizontal: 5,
                  marginBottom: 0,
                },
              ]}
            >
              Goals
            </Text>
            <Text
              style={[
                globalStyles.label,
                { fontSize: 15, marginRight: 10, lineHeight: 29 },
                theme === "dark" && globalStyles.textLightLight,
              ]}
            >
              We champion the mission, Simplify farmland rental, Inspire agripreneurship, and Encourage Agro-education.
            </Text>

            <HomeAdverts />

            <Text
              style={[
                globalStyles.label,
                {
                  fontWeight: "600",
                  fontSize: 18,
                  color: theme === "dark" ? "#fff" : colors.greenDarkColor,
                  fontFamily: "PoppinsBold",
                  marginTop: 10,
                  paddingHorizontal: 5,
                },
              ]}
            >
              We alleviate poverty, create jobs, and connect Farmers to global opportunities
            </Text>
            <Text
              style={[
                globalStyles.label,
                { fontSize: 15, marginRight: 10, lineHeight: 29 },
                theme === "dark" && globalStyles.textLightLight,
              ]}
            >
              Our collective responsibility here, ranges from poverty alleviation and job creation to food security and
              connection Farmers to global opportunities which could take the form of grants, whilst raising a community
              of proxy farmers who might never have to visit any of our farmland for the lack of time and practical
              knowledge but daily meeting the needs of their counterparts by buying arable farmlands to be rented for
              farming.
            </Text>

            <View style={[{ marginTop: 20, alignItems: "center" }]}>
              <Image
                source={require("../../../assets/img/logo.png")}
                style={{ width: 190, height: 190 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    position: "absolute",
    top: -10,
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,
    zIndex: 12,
    // elevation: 3,
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
    color: "#fff",
    marginLeft: -45,
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 100,
  },
});
export default AboutModal;
