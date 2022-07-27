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
import { TextInputMask } from "react-native-masked-text";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import { setSelectBankModal, setSelectCardModal, setSelectedNetwork } from "../../../../store/alert/alertSlice";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const MTNImage = require("../../../../assets/img/mtn.png");
const GLOImage = require("../../../../assets/img/glo.png");
const AirtelImage = require("../../../../assets/img/airtel.jpg");
const EtisalatImage = require("../../../../assets/img/etisalat.jpg");

const FirstScreen = ({
  amount,
  setAmount,
  setMobileNumber,
  selectedNetwork,
  mobileNumber,
  airtimeDataProviders,
  theme,
}) => {
  const dispatch = useDispatch();

  const selectItemm = (item) => {
    // console.log(item);
    dispatch(setSelectedNetwork(item));
  };

  const AirtimeList = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => selectItemm(item)}
        style={[
          styles.card,
          index === 0 && styles.addMarginLeft,
          index === 3 && styles.addMarginRight,
          selectedNetwork && selectedNetwork.code == item.code ? globalStyles.selectedItem : styles.hasBore,
          styles.imageCard,

          { padding: 10, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
          theme === "dark" && globalStyles.cardDark,
        ]}
      >
        {item?.name === "mtn" && (
          <Image source={MTNImage} style={[{ width: 72, height: 65, borderRadius: 100 }]} resizeMode="cover" />
        )}
        {item?.name === "glo" && (
          <Image source={GLOImage} style={[{ width: 72, height: 65, borderRadius: 100 }]} resizeMode="cover" />
        )}
        {item?.name === "airtel" && (
          <Image source={AirtelImage} style={[{ width: 72, height: 65, borderRadius: 100 }]} resizeMode="cover" />
        )}
        {item?.name === "etisalat" && (
          <Image source={EtisalatImage} style={[{ width: 72, height: 65, borderRadius: 100 }]} resizeMode="cover" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: screenWidth, paddingBottom: 0 }}>
      <View style={[styles.productContainer]}>
        <View style={{ marginTop: 30, marginBottom: 10, width: "95%", paddingRight: 10 }}>
          <View style={{ marginBottom: 30 }}>
            <Text
              style={[
                styles.productCardContentItemLeft,
                { fontSize: 15, marginBottom: 20, fontWeight: "600" },
                theme === "dark" && globalStyles.textLight,
              ]}
            >
              Select network provider
            </Text>
            <FlatList
              horizontal
              contentContainerStyle={{ paddingRight: 30 }}
              data={airtimeDataProviders}
              style={{ width: screenWidth, marginRight: 30, paddingRight: 0 }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.code}
              renderItem={({ item, index }) => <AirtimeList item={item} index={index} />}
            />
          </View>
          <View style={{ marginTop: 0, marginBottom: 10, width: "100%", paddingRight: 0 }}>
            <Text
              style={[
                styles.productCardContentItemLeft,
                { fontSize: 15, marginBottom: 2, fontWeight: "600" },
                theme === "dark" && globalStyles.textLight,
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
              placeholder="0"
              placeholderTextColor={theme === "dark" ? "#fff" : "#444"}
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
              }}
              style={[
                { borderBottomWidth: 1, borderColor: colors.greenColor, height: 50, fontSize: 33, fontWeight: "700" },
                theme === "dark" && globalStyles.textLight,
              ]}
            />
          </View>
          <View>
            <View style={{ marginTop: 20, marginBottom: 10, width: "100%", paddingRight: 0 }}>
              <Text
                style={[
                  styles.productCardContentItemLeft,
                  { fontSize: 15, marginBottom: 2, fontWeight: "600" },
                  theme === "dark" && globalStyles.textLight,
                ]}
              >
                Mobile Number
              </Text>
              <View style={[globalStyles.inputContainer, { height: 57 }]}>
                <TextInput
                  value={mobileNumber}
                  keyboardType="numeric"
                  onChangeText={(text) => setMobileNumber(text)}
                  autoCorrect={false}
                  style={[
                    globalStyles.inputTextt,
                    { fontSize: 19, fontWeight: "600" },
                    theme === "dark" && globalStyles.textLight,
                  ]}
                />
              </View>
            </View>
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
