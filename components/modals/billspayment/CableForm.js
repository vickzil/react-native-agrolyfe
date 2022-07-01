import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import SelectPackageModal from "./SelectPackageModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SelectProductModal from "./SelectProductModal";

const { width } = Dimensions.get("screen");

const CableForm = ({ closeModal }) => {
  const [ICUNumber, setICUNumber] = useState("");
  const [amount, setAmount] = useState("0");
  const [buttonText, setButtonText] = useState("Continue");
  const [emptyFields, setEmptyFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectPackageModal, setSelectPackageModal] = useState({
    status: false,
    data: null,
  });
  const [selectProductModal, setSelectProductModal] = useState({
    status: false,
    data: null,
  });

  const resetAndClose = () => {
    setButtonText("Submit");
    setICUNumber("");
    setEmptyFields(true);
    setLoading(false);
    setAmount("0");

    closeModal();
  };

  const procceed = () => {
    resetAndClose();
  };

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
    setAmount("0");
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
      data: [
        {
          id: 1,
          name: "DSTV",
        },
        {
          id: 2,
          name: "GOTV",
        },
        {
          id: 3,
          name: "STARTIMES",
        },
      ],
    });
  };

  const chooseProduct = () => {
    setSelectedProduct(null);
    setSelectProductModal({
      status: true,
      data: [
        {
          id: 1,
          name: "Dstv Padi",
        },
        {
          id: 2,
          name: "Dstv Yanga",
        },
        {
          id: 3,
          name: "Dstv Confam",
        },
        {
          id: 4,
          name: "Dstv Compact",
        },
        {
          id: 5,
          name: "Dstv Premium",
        },
      ],
    });
  };

  return (
    <View style={{ marginTop: 0, marginBottom: 30, width, paddingRight: 0, paddingLeft: 10 }}>
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

      <View style={[globalStyles.productContainer, { width: "100%" }]}>
        <View style={{ marginTop: 10, marginBottom: 20, width: "97%", paddingRight: 10 }}>
          <Text style={[styles.productCardContentItemLeft, { fontSize: 16, marginBottom: 5, fontWeight: "500" }]}>
            Select Package
          </Text>
          <TouchableOpacity style={[globalStyles.inputContainer, { height: 57 }]} onPress={() => choosePackage()}>
            <Text style={globalStyles.inputTextt}> {selectedPackage ? selectedPackage.name : "Selected Package"} </Text>
            <Icon name="chevron-down" size={24} style={[{ color: "#222", marginLeft: -10 }]} />
          </TouchableOpacity>
        </View>
        {selectedPackage && (
          <View style={{ marginTop: 5, marginBottom: 20, width: "97%", paddingRight: 10 }}>
            <Text style={[styles.productCardContentItemLeft, { fontSize: 16, marginBottom: 5, fontWeight: "500" }]}>
              Select Product
            </Text>
            <TouchableOpacity style={[globalStyles.inputContainer, { height: 57 }]} onPress={() => chooseProduct()}>
              <Text style={globalStyles.inputTextt}>
                {" "}
                {selectedProduct ? selectedProduct.name : "Selected Product"}{" "}
              </Text>
              <Icon name="chevron-down" size={24} style={[{ color: "#222", marginLeft: -10 }]} />
            </TouchableOpacity>
          </View>
        )}

        {selectedProduct && (
          <View style={{ marginTop: 0, marginBottom: 20, width: "97%", paddingRight: 10 }}>
            <Text style={[styles.productCardContentItemLeft, { fontSize: 16, marginBottom: 5, fontWeight: "500" }]}>
              Amount
            </Text>
            <View style={[globalStyles.inputContainer, globalStyles.inputContainerDisabled, { height: 57 }]}>
              <TextInput
                value={"₦ " + amount}
                editable={false}
                style={[globalStyles.inputTextt, { fontSize: 25, fontWeight: "bold", color: "#888" }]}
              />
            </View>
          </View>
        )}

        {selectedProduct && (
          <View style={{ marginTop: 0, marginBottom: 20, width: "97%", paddingRight: 10 }}>
            <Text style={[styles.productCardContentItemLeft, { fontSize: 16, marginBottom: 5, fontWeight: "500" }]}>
              Smart Card Number
            </Text>
            <View style={[globalStyles.inputContainer, { height: 57 }]}>
              <TextInput
                value={ICUNumber}
                onChangeText={(text) => setICUNumber(text)}
                autoCorrect={false}
                style={globalStyles.inputTextt}
              />
            </View>
          </View>
        )}

        <CustomLoadingButton
          onPress={() => procceed()}
          emptyFields={emptyFields}
          buttonText={buttonText}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageCard: {
    position: "relative",
    width: width * 0.25,
    borderRadius: 15,
    marginRight: 5,
    marginLeft: 7,
    backgroundColor: "#fff",
    // borderWidth: 0.7,
    // borderColor: "#16856f",
    textAlign: "left",
  },

  addMarginLeft: {
    marginLeft: 0,
  },

  addMarginRight: {
    marginRight: 30,
  },

  selectedItem: {
    borderWidth: 3,
    borderColor: "#e79b0e",
  },
});
export default CableForm;
