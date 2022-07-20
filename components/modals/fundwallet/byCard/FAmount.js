import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TextInputMask } from "react-native-masked-text";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import { setSelectCardModal } from "../../../../store/alert/alertSlice";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const FAmount = ({ amount, setAmount, card, theme }) => {
  const dispatch = useDispatch();

  return (
    <View style={[styles.productContainer]}>
      <View style={{ marginTop: 60, marginBottom: 10, width: "95%", paddingRight: 10 }}>
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
              How much would you like to fund? (Amount)
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
              placeholderTextColor={theme === "dark" ? "#fff" : "444"}
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
            Select Card
          </Text>
          <View
            style={[styles.productCardContentItem, { borderBottomWidth: 1, borderColor: "#f0f0f0", marginBottom: 30 }]}
          >
            <Text style={[styles.productCardContentItemLeft, theme === "dark" && globalStyles.textLight]}> Card</Text>
            <TouchableOpacity
              style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              activeOpacity={0.7}
              onPress={() =>
                dispatch(
                  setSelectCardModal({
                    status: true,
                    type: "Fund_WALLET_BY_CARD",
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
                    {card ? card?.cardBankName : "Select card"} {card ? " - " + card?.cardLast4 : null}
                  </Text>
                  {card ? (
                    <Text
                      style={[
                        styles.productCardContentItemRight,
                        { fontWeight: "600", color: colors.greenColor, fontSize: 15 },
                      ]}
                    >
                      switch card
                    </Text>
                  ) : null}
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
