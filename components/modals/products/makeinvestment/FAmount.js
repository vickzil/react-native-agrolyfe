import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import { useDispatch } from "react-redux";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import POPUpModal from "../../POPUpModal";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const productImage = require("../../../../assets/img/productimage.jpeg");

const FAmount = ({ amount, setAmount, duration, setDuration }) => {
  const dispatch = useDispatch();
  const [showDurationModal, setShowDurationModal] = useState(false);

  const durations = ["3 Months", "6 Months", "9 Months", "10 Months", "12 Months"];

  return (
    <View style={[styles.productContainer]}>
      <POPUpModal visible={showDurationModal} setVisible={setShowDurationModal} modalTitle=" Relationship">
        <View>
          {durations?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[globalStyles.selectContainer, duration == item ? globalStyles.selectedItem : null]}
              onPress={() => {
                setShowDurationModal(false);
                setDuration(item);
              }}
            >
              <View style={globalStyles.selectContent} key={index}>
                <Text style={[globalStyles.selectContentText, globalStyles.selectContentText1]}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </POPUpModal>
      <View style={{ marginTop: 0, marginBottom: 10, width: "95%", paddingRight: 10 }}>
        <View>
          <View style={{ marginTop: 20, marginBottom: 30 }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}>
              <View style={globalStyles.accountImage}>
                <Image
                  source={productImage}
                  style={[{ width: "100%", height: "100%", borderRadius: 100 }]}
                  resizeMode="cover"
                />
              </View>

              <Text style={globalStyles.accountUserFullName}>Agrovest</Text>
              <Text style={globalStyles.accountTitle}>22% Rental Fee</Text>
            </View>
          </View>
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text
              style={[
                styles.productCardContentItemLeft,
                {
                  fontSize: 20,
                  marginBottom: 20,
                  fontWeight: "800",
                  fontFamily: "Poppins",
                  letterSpacing: -0.35644,
                  color: colors.greenDarkDarkColor,
                },
              ]}
            >
              Amount
            </Text>

            <TextInputMask
              type={"money"}
              options={{
                precision: 0,
                //   separator: ",",
                delimiter: ",",
                unit: "₦",
                suffixUnit: "",
              }}
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
              }}
              style={[
                {
                  borderBottomWidth: 1,
                  borderColor: colors.greenColor,
                  height: 50,
                  fontSize: 33,
                  fontWeight: "700",
                  width: "100%",
                  textAlign: "center",
                },
              ]}
            />
          </View>
          <View style={{ marginTop: 60, alignItems: "center" }}>
            <Text
              style={[
                styles.productCardContentItemLeft,
                {
                  fontSize: 20,
                  marginBottom: 20,
                  fontWeight: "800",
                  fontFamily: "Poppins",
                  letterSpacing: -0.35644,
                  color: colors.greenDarkDarkColor,
                },
              ]}
            >
              Select Duration
            </Text>

            <TouchableOpacity
              style={[globalStyles.inputContainer, { height: 50 }]}
              onPress={() => setShowDurationModal(true)}
            >
              <TextInput value={duration} editable={false} style={globalStyles.inputTextt} />
              <FontAwesome5Icon name="chevron-circle-down" size={16} color="#666" style={{ marginRight: 10 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FAmount;

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
});
