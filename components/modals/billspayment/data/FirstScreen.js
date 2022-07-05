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
import CurrencyInput from "react-native-currency-input";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import { setSelectBankModal, setSelectCardModal, setSelectedNetwork } from "../../../../store/alert/alertSlice";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const userImage = require("../../../../assets/img/user.jpg");

const FirstScreen = ({ amount, setAmount, setMobileNumber, selectedNetwork, mobileNumber }) => {
  const dispatch = useDispatch();

  const [overview] = useState([
    {
      id: 1,
      name: "MTN",
      img: require("../../../../assets/img/mtn.png"),
    },
    {
      id: 2,
      name: "GLO",
      img: require("../../../../assets/img/glo.png"),
    },
    {
      id: 3,
      name: "Airtel",
      img: require("../../../../assets/img/airtel.jpg"),
    },
    {
      id: 4,
      name: "Etisalat",
      img: require("../../../../assets/img/etisalat.jpg"),
    },
  ]);

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
          selectedNetwork && selectedNetwork.id == item.id ? globalStyles.selectedItem : styles.hasBore,
          styles.imageCard,

          { padding: 10, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Image source={item.img} style={[{ width: 72, height: 72, borderRadius: 100 }]} resizeMode="cover" />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: screenWidth, paddingBottom: 0 }}>
      <View style={[styles.productContainer]}>
        <View style={{ marginTop: 30, marginBottom: 10, width: "95%", paddingRight: 10 }}>
          <View style={{ marginBottom: 50 }}>
            <Text style={[styles.productCardContentItemLeft, { fontSize: 17, marginBottom: 20, fontWeight: "600" }]}>
              Select network provider
            </Text>
            <FlatList
              horizontal
              contentContainerStyle={{ paddingRight: 30 }}
              data={overview}
              style={{ width: screenWidth, marginRight: 30, paddingRight: 0 }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => <AirtimeList item={item} index={index} />}
            />
          </View>
          <View>
            <View style={{ marginTop: 0, marginBottom: 10, width: "100%", paddingRight: 0 }}>
              <Text style={[styles.productCardContentItemLeft, { fontSize: 17, marginBottom: 5, fontWeight: "600" }]}>
                Mobile Number
              </Text>
              <View style={[globalStyles.inputContainer, { height: 57 }]}>
                <TextInput
                  value={mobileNumber}
                  keyboardType="numeric"
                  onChangeText={(text) => setMobileNumber(text)}
                  autoCorrect={false}
                  style={[globalStyles.inputTextt, { fontSize: 19, fontWeight: "600" }]}
                />
              </View>
            </View>

            <View style={{ marginTop: 20, marginBottom: 10, width: "100%", paddingRight: 0 }}>
              <Text style={[styles.productCardContentItemLeft, { fontSize: 17, marginBottom: 5, fontWeight: "600" }]}>
                Amount
              </Text>
              <CurrencyInput
                value={amount}
                onChangeValue={setAmount}
                prefix="₦ "
                delimiter=","
                // separator="."
                precision={0}
                // onChangeText={(formattedValue) => {
                //   console.log(formattedValue);
                // }}
                style={[globalStyles.inputContainer, { fontSize: 25, fontWeight: "bold" }]}
              />
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
