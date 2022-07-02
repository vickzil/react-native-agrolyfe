import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../../styles/global";
import CurrencyInput from "react-native-currency-input";
import colors from "../../../styles/colors";
import CustomLoadingButton from "../../customs/CustomLoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNetwork } from "../../../store/alert/alertSlice";

const { width } = Dimensions.get("screen");

const BuyAirtimeForm = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState(null);
  const [buttonText, setButtonText] = useState("Continue");
  const [emptyFields, setEmptyFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const selectedNetwork = useSelector((state) => state.alert.selectedNetwork);

  const [overview] = useState([
    {
      id: 1,
      name: "MTN",
      img: require("../../../assets/img/mtn.png"),
    },
    {
      id: 2,
      name: "GLO",
      img: require("../../../assets/img/glo.png"),
    },
    {
      id: 3,
      name: "Airtel",
      img: require("../../../assets/img/airtel.jpg"),
    },
    {
      id: 4,
      name: "Etisalat",
      img: require("../../../assets/img/etisalat.jpg"),
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
          selectedNetwork && selectedNetwork.id == item.id ? styles.selectedItem : null,
          styles.imageCard,
          { padding: 10, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Image source={item.img} style={[{ width: 72, height: 72, borderRadius: 100 }]} resizeMode="cover" />
      </TouchableOpacity>
    );
  };

  const resetAndClose = () => {
    setButtonText("Submit");
    setMobileNumber("");
    setEmptyFields(true);
    setLoading(false);

    closeModal();
  };

  const procceed = () => {
    resetAndClose();
  };

  return (
    <View style={{ marginTop: 20, marginBottom: 30, width, paddingRight: 0, paddingLeft: 10 }}>
      <Text style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 20, fontWeight: "500" }]}>
        Select network provider
      </Text>
      <FlatList
        horizontal
        contentContainerStyle={{ paddingRight: 30 }}
        data={overview}
        style={{ width, marginRight: 30, paddingRight: 30 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <AirtimeList item={item} index={index} />}
      />

      <View style={[globalStyles.productContainer, { width: "100%" }]}>
        <View style={{ marginTop: 20, marginBottom: 10, width: "97%", paddingRight: 10 }}>
          <Text style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 5, fontWeight: "500" }]}>
            Mobile Number
          </Text>
          <View style={[globalStyles.inputContainer, { height: 57 }]}>
            <TextInput
              value={mobileNumber}
              keyboardType="numeric"
              onChangeText={(text) => setMobileNumber(text)}
              autoCorrect={false}
              style={globalStyles.inputTextt}
            />
          </View>
        </View>

        <View style={{ marginTop: 10, marginBottom: 10, width: "97%", paddingRight: 10 }}>
          <Text style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 5, fontWeight: "500" }]}>
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
            style={[globalStyles.inputContainer, globalStyles.inputTextt, { fontSize: 25, fontWeight: "bold" }]}
          />
        </View>

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

export default BuyAirtimeForm;

const styles = StyleSheet.create({
  imageCard: {
    position: "relative",
    width: width * 0.25,
    borderRadius: 15,
    marginRight: 5,
    marginLeft: 7,
    backgroundColor: "#fff",
    // borderWidth: 0.7,
    // borderColor: "#18856f",
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