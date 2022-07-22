import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SelectPackageModal from "../SelectPackageModal";
import SelectProductModal from "../SelectProductModal";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const FirstScreen = ({
  amount,
  setAmount,
  setICUNumber,
  selectedProduct,
  setSelectedProduct,
  ICUNumber,
  selectedPackage,
  setSelectedPackage,
  cableTvProviders,
  theme,
}) => {
  const dispatch = useDispatch();

  const [selectPackageModal, setSelectPackageModal] = useState({
    status: false,
    data: null,
  });

  const [selectProductModal, setSelectProductModal] = useState({
    status: false,
    data: null,
  });

  const closeSelectPackage = () => {
    setSelectPackageModal({
      status: false,
      data: [],
    });
  };

  const closeSelectPRoduct = () => {
    setSelectProductModal({
      status: false,
      data: [],
    });
  };

  const choosenPage = (sPackage) => {
    setSelectedPackage(sPackage);
    setSelectedProduct(null);
    setSelectPackageModal({
      status: false,
      data: [],
    });
  };

  const choosenProd = (sProduct) => {
    setSelectedProduct(sProduct);
    setAmount("5000");
    setSelectProductModal({
      status: false,
      data: [],
    });
  };

  const choosePackage = () => {
    setSelectPackageModal({
      status: true,
      data: cableTvProviders,
    });
  };

  const chooseProduct = () => {
    setSelectedProduct(null);
    setSelectProductModal({
      status: true,
      data: selectedPackage?.cableTVProviderPlans,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: screenWidth, paddingBottom: 0 }}>
      <SelectPackageModal
        data={selectPackageModal}
        closeModal={closeSelectPackage}
        choosenPage={choosenPage}
        selectedPackage={selectedPackage}
      />
      <SelectProductModal
        data={selectProductModal}
        closeModal={closeSelectPRoduct}
        choosenProd={choosenProd}
        selectedProduct={selectedProduct}
      />

      <View style={[styles.productContainer, { paddingBottom: 270 }]}>
        <View style={{ marginTop: 30, marginBottom: 0, width: "95%", paddingRight: 10 }}>
          <View>
            <View style={{ marginTop: 0, marginBottom: 30, width: "100%", paddingRight: 0 }}>
              <Text
                style={[
                  styles.productCardContentItemLeft,
                  { fontSize: 15, marginBottom: 5, fontWeight: "600" },
                  theme === "dark" && globalStyles.textLight,
                ]}
              >
                Select Package
              </Text>
              <TouchableOpacity style={[globalStyles.inputContainer, { height: 57 }]} onPress={() => choosePackage()}>
                <Text style={[globalStyles.inputTextt, theme === "dark" && globalStyles.textLight]}>
                  {" "}
                  {selectedPackage ? selectedPackage.name : "Selected Package"}{" "}
                </Text>
                <Icon
                  name="chevron-down"
                  size={24}
                  style={[{ color: theme === "dark" ? "#f4f4f4" : "#222", marginLeft: -10 }]}
                />
              </TouchableOpacity>
            </View>
            {selectedPackage ? (
              <View style={{ marginTop: 0, marginBottom: 30, width: "100%", paddingRight: 0 }}>
                <Text
                  style={[
                    styles.productCardContentItemLeft,
                    { fontSize: 15, marginBottom: 5, fontWeight: "600" },
                    theme === "dark" && globalStyles.textLight,
                  ]}
                >
                  Select Product
                </Text>
                <TouchableOpacity style={[globalStyles.inputContainer, { height: 57 }]} onPress={() => chooseProduct()}>
                  <Text style={[globalStyles.inputTextt, theme === "dark" && globalStyles.textLight]}>
                    {" "}
                    {selectedProduct ? selectedProduct.name : "Selected Product"}{" "}
                  </Text>
                  <Icon name="chevron-down" size={24} style={[{ color: "#222", marginLeft: -10 }]} />
                </TouchableOpacity>
              </View>
            ) : null}
            {selectedProduct ? (
              <View style={{ marginTop: 0, marginBottom: 10, width: "100%", paddingRight: 0 }}>
                <Text
                  style={[
                    styles.productCardContentItemLeft,
                    { fontSize: 15, marginBottom: 5, fontWeight: "600" },
                    theme === "dark" && globalStyles.textLight,
                  ]}
                >
                  Smart Card Number
                </Text>
                <View style={[globalStyles.inputContainer, { height: 57 }]}>
                  <TextInput
                    value={ICUNumber}
                    onChangeText={(text) => setICUNumber(text)}
                    autoCorrect={false}
                    style={[
                      globalStyles.inputTextt,
                      { fontSize: 19, fontWeight: "600" },
                      theme === "dark" && globalStyles.textLight,
                    ]}
                  />
                </View>
              </View>
            ) : null}
            {selectedProduct ? (
              <View style={{ marginTop: 20, marginBottom: 10, width: "100%", paddingRight: 0 }}>
                <Text
                  style={[
                    styles.productCardContentItemLeft,
                    { fontSize: 17, marginBottom: 5, fontWeight: "600" },
                    theme === "dark" && globalStyles.textLight,
                  ]}
                >
                  Amount
                </Text>
                <View style={[globalStyles.inputContainer, globalStyles.inputContainerDisabled, { height: 57 }]}>
                  <Text style={[globalStyles.inputTextt, { fontSize: 25, fontWeight: "bold" }]}>{"₦ " + amount}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    alignItems: "center",
  },

  productCardContentItem: {
    flexDirection: "row",
    paddingBottom: 25,
    paddingTop: 26,
    marginBottom: 26,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },

  productCardContentItemLeft: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginRight: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  productCardContentItemRight: {
    fontSize: 16,
    color: "#444",
    fontWeight: "600",
    justifyContent: "flex-end",
    fontFamily: "Montserrat",
  },

  imageCard: {
    position: "relative",
    width: screenWidth * 0.22,
    borderRadius: 15,
    marginRight: 5,
    marginLeft: 0,
    backgroundColor: "#fff",
    textAlign: "left",
  },

  hasBore: {
    borderWidth: 0.7,
    borderColor: "#18856f",
  },

  addMarginLeft: {
    marginLeft: 0,
  },

  addMarginRight: {
    marginRight: 30,
  },
});
