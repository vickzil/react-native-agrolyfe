import {
  Animated,
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
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProductDetailsModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

const imageURL = "https://oxfordvestapi.azurewebsites.net/Docs/AvailableInvestments/mortgage_v1.jpeg";

const ProductRoughModal = () => {
  const modal = useSelector((state) => state.alert.productDetailsModal);
  const dispatch = useDispatch();

  let scrollA = useRef(new Animated.Value(0)).current;

  function closeModal() {
    dispatch(
      setProductDetailsModal({
        status: false,
        payload: null,
      }),
    );
    scrollA = 0;
  }

  return (
    <Modal visible={modal?.status} animationType="slide" onRequestClose={closeModal}>
      <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <View style={[styles.modalHeader]}>
          <Icon name="arrow-left" size={20} style={[styles.modalHeaderIcon, { color: "#222" }]} onPress={closeModal} />
        </View>
        <Animated.ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollA } } }], { useNativeDriver: true })}
          scrollEventThrottle={16}
        >
          <View style={styles.productImage}>
            <Animated.Image
              source={{ uri: imageURL }}
              style={[styles.bannerImage(scrollA), { width: "100%", height: 300 }]}
              resizeMode="cover"
            />
          </View>
          <View style={styles.productDetailsBody}>
            <View style={styles.productDetailsBodyContainer}>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: -22,
                }}
              >
                <View style={styles.productHeight}></View>
              </View>
              <Text style={styles.productDetailsBodyCategory}>__Agrovest</Text>
              <View style={styles.productDetailsBodyNameRate}>
                <Text style={styles.productDetailsBodyProductName}>agrolyfe_land_lag_001 - (20.00)</Text>
                <Text style={styles.productDetailsBodyProductRate}>20%</Text>
              </View>
              <View style={styles.productDetailsBodyLocationD}>
                <Text style={styles.productDetailsBodyLocationState}>Lagos </Text>
                <Text style={styles.productDetailsBodyLocationDuration}>12 Months</Text>
              </View>
              <Text style={styles.productDetailsBodyLabel}>About</Text>
              <Text style={styles.productDetailsBodyDesc}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, recusandae illo. Velit consequatur harum
                error fuga quidem, magni, fugiat delectus sapiente quibusdam quis fugit numquam explicabo, eos libero
                atque? Excepturi facere atque rem nemo quaerat facilis blanditiis earum odit cumque quia, voluptate
                explicabo? Expedita ullam molestias laboriosam reprehenderit, tenetur distinctio ab iusto animi quia
                ipsum omnis molestiae dolorum, quis cumque minus ipsam facilis numquam officia itaque perspiciatis,
                soluta aliquam. Rerum veritatis, explicabo enim, ab quod architecto quam magni eaque ut placeat vitae
                exercitationem expedita dolorem excepturi deserunt at voluptatibus voluptate numquam similique, quasi
                temporibus quibusdam doloribus? Consectetur commodi aut alias?
              </Text>

              <View style={{ marginTop: 50 }}>
                <TouchableOpacity
                  style={[styles.productButton, { backgroundColor: colors.greenColor, marginTop: 10 }]}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>Purchase Product</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.ScrollView>

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
    backgroundColor: "#f1f1f1",
    padding: 6,
    borderRadius: 50,
  },

  productDetailsBody: {
    backgroundColor: "#f2f2f2",
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
  },

  bannerImage: (scrollA) => ({
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-300, 0, 300, 300 + 1],
          outputRange: [-300 / 2, 0, 300 * 0.75, 300 * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-300, 0, 300, 300 + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),

  productDetailsBodyContainer: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 0,
  },

  productHeight: {
    width: "22%",
    height: 7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#ccc",
    marginBottom: 10,
    borderRadius: 20,
  },

  productDetailsBodyCategory: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderColor: "#ddd",
    // marginTop: 10,
  },

  productDetailsBodyNameRate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  productDetailsBodyProductName: {
    fontSize: 15,
    color: "#444",
    fontWeight: "900",
    fontFamily: "PoppinsBold",
  },

  productDetailsBodyProductRate: {
    backgroundColor: colors.greenNormalColor,
    fontSize: 14,
    color: "#fff",
    fontWeight: "700",
    textAlign: "right",
    padding: 10,
    paddingHorizontal: 18,
    // borderRadius: 8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  productDetailsBodyLocationD: {
    // flexDirection: "row",
    // justifyContent: "flex-start",
    // alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
    // paddingBottom: 15,
    // borderBottomWidth: 2,
    // borderColor: "#ddd",
  },

  productDetailsBodyLocationState: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  productDetailsBodyLocationDuration: {
    fontSize: 20,
    color: colors.greenColor,
    fontWeight: "900",
    fontFamily: "PoppinsBold",
    // marginLeft: 80,
    marginTop: 20,
  },

  productDetailsBodyLabel: {
    fontSize: 22,
    color: "#444",
    fontWeight: "900",
    fontFamily: "MontserratBold",
    marginTop: 20,
  },

  productDetailsBodyDesc: {
    width: "100%",
    fontSize: 16,
    color: "#333",
    fontWeight: "300",
    fontFamily: "Poppins",
    marginTop: 16,
    lineHeight: 28,
  },

  productButton: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 13,
    // paddingHorizontal: 40,
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
export default ProductRoughModal;
