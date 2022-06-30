import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../styles/colors";
import { globalStyles } from "../../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectBankModal } from "../../../store/alert/alertSlice";
import CustomLoadingButton from "../../customs/CustomLoadingButton";

const AddBankForm = ({ closeModal }) => {
  const selectedBank = useSelector((state) => state.alert.selectedBank);
  const dispatch = useDispatch();

  const [accountNumber, setAccountNumber] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [emptyFields, setEmptyFields] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(selectedBank);
  }, [selectedBank]);

  const resetAndClose = () => {
    setButtonText("Submit");
    setAccountNumber("Submit");
    setEmptyFields(true);
    setLoading(false);

    closeModal();
  };
  const procceed = () => {
    closeModal();
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.productContainer, { width: "100%" }]}>
          <View style={{ width: "90%" }}>
            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <Text style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 20, fontWeight: "800" }]}>
                Select Bank
              </Text>
              <TouchableOpacity
                style={[globalStyles.inputContainer, { height: 50 }]}
                onPress={() =>
                  dispatch(
                    setSelectBankModal({
                      status: true,
                      type: "Add_BANK",
                    }),
                  )
                }
              >
                <Text style={globalStyles.inputTextt}> {selectedBank ? selectedBank.name : "Selected bank"} </Text>
                <Icon name="chevron-down" size={24} style={[{ color: "#222", marginLeft: -10 }]} />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <Text style={[styles.productCardContentItemLeft, { fontSize: 18, marginBottom: 20, fontWeight: "800" }]}>
                Account Number
              </Text>
              <View style={[globalStyles.inputContainer, { height: 57 }]}>
                <TextInput
                  value={accountNumber}
                  onChangeText={(text) => setAccountNumber(text)}
                  autoCorrect={false}
                  style={globalStyles.inputTextt}
                />
              </View>
            </View>
          </View>
          <View style={[styles.productCardContentItem]}>
            <Text style={styles.productCardContentItemLeft}>Account name</Text>
            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
              <Text style={[styles.productCardContentItemRight, { fontWeight: "700" }]}>Victor Nwakwue</Text>
            </View>
          </View>
          <CustomLoadingButton
            onPress={() => resetAndClose()}
            emptyFields={emptyFields}
            buttonText={buttonText}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  productCardContentItem: {
    // flexDirection: "row",
    paddingBottom: 25,
    paddingTop: 9,
  },

  productCardContentItemLeft: {
    width: "100%",
    fontSize: 18,
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
export default AddBankForm;
