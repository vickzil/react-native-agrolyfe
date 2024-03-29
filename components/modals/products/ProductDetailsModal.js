import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMakeInvestmentModal, setProductDetailsModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FlatListSlider from "../../customs/flatListSlider";
import { globalStyles } from "../../../styles/global";
import { addComma } from "../../helpers/globalFunction";
const { width } = Dimensions.get("screen");

const ProductDetailsModal = () => {
  const modal = useSelector((state) => state.alert.productDetailsModal);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setProductDetailsModal({
        status: false,
        payload: null,
      }),
    );
  };

  const showMakeInvestmentModal = () => {
    dispatch(
      setMakeInvestmentModal({
        status: true,
        payload: modal?.payload,
      }),
    );

    setTimeout(() => {
      closeModal();
    }, 300);
  };

  return (
    <Modal visible={modal?.status} animationType="slide" onRequestClose={() => closeModal()}>
      <View style={{ flex: 1, backgroundColor: theme === "dark" ? colors.darkBody : "#fff" }}>
        <View style={[styles.modalHeader]}>
          <Icon
            name="arrow-left"
            size={20}
            style={[styles.modalHeaderIcon, { color: "#222" }]}
            onPress={() => closeModal()}
          />
        </View>
        <View style={styles.productImage}>
          {/* <FlatList
            style={{ width: "100%", height: 300 }}
            horizontal
            data={images}
            showsHorizontalScrollIndicator={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Image source={{ uri: item.img }} style={{ width: "100%", height: 300 }} resizeMode="cover" />
            )}
          /> */}

          <FlatListSlider
            data={[
              {
                id: 1,
                imageURL: modal?.payload?.imageURL,
              },
            ]}
            height={300}
            timer={5000}
            onPress={(item) => console.log("")}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            indicatorContainerStyle={{ position: "absolute", bottom: 65 }}
            indicatorActiveColor={"#8e44ad"}
            indicatorInActiveColor={"#ffffff"}
            indicatorActiveWidth={0}
            animation
            loop={false}
          />
        </View>

        <ScrollView
          style={[styles.productDetailsBody, theme === "dark" && globalStyles.containerDark]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.productDetailsBodyContainer}>
            <View style={styles.productCardContentItem}>
              <Text style={styles.productCardContentItemLeft}>Product Name</Text>
              <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                {modal?.payload?.name}
              </Text>
            </View>
            <View style={styles.productCardContentItem}>
              <Text style={styles.productCardContentItemLeft}>Rental fee (%)</Text>
              <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                {modal?.payload?.newInterestRate}%
              </Text>
            </View>
            <View style={styles.productCardContentItem}>
              <Text style={styles.productCardContentItemLeft}>Price Per Acre</Text>
              <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                ₦{" "}
                {modal?.payload ? addComma(modal?.payload?.pricePerUnit) + " " + modal?.payload?.unitOfMeasurement : 0}{" "}
              </Text>
            </View>

            <View style={styles.productCardContentItem}>
              <Text style={styles.productCardContentItemLeft}>Duration</Text>
              <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                {modal?.payload?.duration} Months
              </Text>
            </View>

            <View style={styles.productCardContentItem}>
              <Text style={styles.productCardContentItemLeft}>Min Amount</Text>
              <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                ₦ {modal?.payload ? addComma(modal?.payload?.minimumAmount) : 0}{" "}
              </Text>
            </View>
            <View style={styles.productCardContentItem}>
              <Text style={styles.productCardContentItemLeft}>Max Amount</Text>
              <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                ₦ {modal?.payload ? addComma(modal?.payload?.maximumAmount) : 0}{" "}
              </Text>
            </View>
            <View style={styles.productCardContentItem}>
              <Text style={styles.productCardContentItemLeft}>Country</Text>
              <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                {modal?.payload && modal?.payload?.country === "NG" ? "Nigeria" : modal?.payload?.country}
              </Text>
            </View>
            <View style={styles.productCardContentItem}>
              <Text style={styles.productCardContentItemLeft}>State</Text>
              <Text style={[styles.productCardContentItemRight, theme === "dark" && globalStyles.textLight]}>
                {modal?.payload?.state}
              </Text>
            </View>
            <Text
              style={[
                styles.productDetailsBodyLabel,
                { fontWeight: "600", fontFamily: "PoppinsBold" },
                theme === "dark" && globalStyles.textLightLight,
              ]}
            >
              Description
            </Text>
            <Text style={[styles.productDetailsBodyDesc, theme === "dark" && globalStyles.textLight]}>
              {modal?.payload?.description}
            </Text>
          </View>
        </ScrollView>
        <View style={[globalStyles.buttonFloat, { marginTop: 50 }]}>
          <TouchableOpacity style={{}} onPress={() => showMakeInvestmentModal()}>
            <View style={[styles.productButton, { backgroundColor: colors.greenColor, marginTop: 10 }]}>
              <Text style={styles.buttonText}>Purchase land </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <Cards /> */}
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    position: "absolute",
    top: 0,
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,
    zIndex: 6,
    // elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 50,
  },

  productDetailsBody: {
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 15,
    // marginBottom: 50,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // marginTop: -20,
  },

  bodyTopContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  bodyTopCard: {
    position: "relative",
    width: "90%",
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 14,
    elevation: 1,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 5,
    backgroundColor: colors.greenDarkColor,
    marginTop: -80,
    zIndex: 60,
    // elevation: 1,
  },

  productDetailsBodyContainer: {
    width: "100%",
    // paddingTop: 10,
    paddingBottom: 40,
  },

  productCardContentItem: {
    flexDirection: "row",
    paddingBottom: 15,
    marginBottom: 15,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },

  productCardContentItemLeft: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.greenLightDarkColor,
    marginRight: 15,
    fontFamily: "Poppins",
  },

  productCardContentItemRight: {
    fontSize: 15,
    color: "#444",
    fontWeight: "600",
    justifyContent: "flex-end",
    fontFamily: "Montserrat",
  },

  productDetailsBodyNameRate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
  },

  productDetailsBodyProductName: {
    fontSize: 20,
    color: "#444",
    fontWeight: "900",
    fontFamily: "PoppinsBold",
    textAlign: "center",
  },

  productDetailsBodyLabel: {
    fontSize: 18,
    color: "#444",
    fontWeight: "900",
    fontFamily: "MontserratBold",
    // marginTop: 20,
  },

  productDetailsBodyDesc: {
    width: "100%",
    fontSize: 15,
    color: "#333",
    fontWeight: "300",
    fontFamily: "Poppins",
    marginTop: 16,
    lineHeight: 28,
    paddingBottom: 100,
  },

  productButton: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 19,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
  },

  buttonText: {
    fontSize: 17,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});
export default ProductDetailsModal;
