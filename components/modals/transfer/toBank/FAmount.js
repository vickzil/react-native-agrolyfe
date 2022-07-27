import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TextInputMask } from "react-native-masked-text";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import { setSelectWalletModal, setSelectCardModal, setSelectBankModal } from "../../../../store/alert/alertSlice";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { addComma } from "../../../helpers/globalFunction";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const FAmount = ({ amount, setAmount, bank, selectedWallet, theme }) => {
  const dispatch = useDispatch();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: screenWidth, paddingBottom: 0 }}>
      <View style={[styles.productContainer, { paddingBottom: 0 }]}>
        <View style={{ marginTop: 0, marginBottom: 10, width: "95%", paddingRight: 10 }}>
          <View>
            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <Text
                style={[
                  styles.productCardContentItemLeft,
                  {
                    fontSize: 16,
                    marginBottom: 20,
                    fontWeight: "600",
                    fontFamily: "Montserrat",
                    letterSpacing: -0.35644,
                    color: colors.greenDarkDarkColor,
                  },
                  theme === "dark" && globalStyles.textLight,
                ]}
              >
                How much would you like to transfer? (Amount)
              </Text>

              <TextInputMask
                type={"money"}
                autoFocus={true}
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
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={[
                styles.productCardContentItemLeft,
                {
                  fontSize: 16,
                  marginBottom: 15,
                  fontWeight: "600",
                  color: theme === "dark" ? colors.greenLightDarkColor : colors.greenDarkDarkColor,
                  fontFamily: "Montserrat",
                  letterSpacing: -0.35644,
                },
              ]}
            >
              Select Bank
            </Text>
            <View
              style={[
                styles.productCardContentItem,
                { borderBottomWidth: 1, borderColor: "#f0f0f0", marginBottom: 30 },
              ]}
            >
              <Text style={[styles.productCardContentItemLeft, theme === "dark" && globalStyles.textLight]}> Bank</Text>
              <TouchableOpacity
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                activeOpacity={0.7}
                onPress={() =>
                  dispatch(
                    setSelectBankModal({
                      status: true,
                      type: "TRANSFER_TO_BANK",
                    }),
                  )
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginRight: -5,
                  }}
                >
                  <View style={{ marginRight: 10, justifyContent: "flex-end", alignItems: "flex-end" }}>
                    <Text
                      style={[
                        styles.productCardContentItemRight,
                        { fontWeight: "600", color: colors.greenColor, fontSize: 16 },
                      ]}
                    >
                      {bank ? bank?.bankName : "Select bank"}
                    </Text>
                    <Text
                      style={[
                        styles.productCardContentItemRight,
                        { fontWeight: "600", color: colors.greenColor, fontSize: 18 },
                      ]}
                    >
                      {bank ? bank?.accountNumber : null}
                    </Text>
                  </View>

                  <Icon
                    name="chevron-right"
                    size={53}
                    style={[styles.modalHeaderIcon, { color: colors.greenColor, fontSize: 23, marginRight: 0 }]}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 20, marginBottom: 30 }}>
            <Text
              style={[
                styles.productCardContentItemLeft,
                {
                  fontSize: 16,
                  marginBottom: 15,
                  fontWeight: "600",
                  color: theme === "dark" ? colors.greenLightDarkColor : colors.greenDarkDarkColor,
                  fontFamily: "Montserrat",
                  letterSpacing: -0.35644,
                },
              ]}
            >
              Select Wallet
            </Text>
            <View
              style={[
                styles.productCardContentItem,
                { borderBottomWidth: 0, borderColor: "#f0f0f0", marginBottom: 30 },
              ]}
            >
              <Text style={[styles.productCardContentItemLeft, theme === "dark" && globalStyles.textLight]}>
                {" "}
                Wallet
              </Text>
              <TouchableOpacity
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                activeOpacity={0.7}
                onPress={() =>
                  dispatch(
                    setSelectWalletModal({
                      status: true,
                      type: "TRANSFER_TO_BANK",
                    }),
                  )
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginRight: -5,
                  }}
                >
                  <View style={{ marginRight: 10, justifyContent: "flex-end", alignItems: "flex-end" }}>
                    <Text
                      style={[
                        styles.productCardContentItemRight,
                        { fontWeight: "600", color: colors.greenColor, fontSize: 16 },
                      ]}
                    >
                      {selectedWallet ? selectedWallet?.name : "Select Wallet"}
                    </Text>
                    {selectedWallet && (
                      <Text
                        style={[
                          styles.productCardContentItemRight,
                          { fontWeight: "600", color: colors.greenColor, fontSize: 18 },
                        ]}
                      >
                        {selectedWallet ? "₦ " + addComma(selectedWallet?.amount) : "Switch wallet"}
                      </Text>
                    )}
                  </View>

                  <Icon
                    name="chevron-right"
                    size={53}
                    style={[styles.modalHeaderIcon, { color: colors.greenColor, fontSize: 23, marginRight: 0 }]}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FAmount;

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    // height: screenHeight,
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
