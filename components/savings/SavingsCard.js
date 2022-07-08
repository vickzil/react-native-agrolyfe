import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../styles/colors";
import IconSearch from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { setPurchaseSavingsModal } from "../../store/alert/alertSlice";
import { addComma } from "../helpers/globalFunction";
import { setSelectedSavingsType, setSelectedSavingsTypeDetails } from "../../store/savings/savingsSlice";

const SavingsCard = ({ item, category }) => {
  const walletOptions = useSelector((state) => state.wallet.walletOptions);
  const dispatch = useDispatch();
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (walletOptions) {
      if (walletOptions?.bySavedCards?.length) {
        setCard(walletOptions?.bySavedCards[0]);
      } else {
        setCard(null);
      }
    }
  }, [walletOptions]);

  const showInitiateModal = () => {
    if (card) {
      dispatch(setSelectedSavingsType("Card"));
      dispatch(setSelectedSavingsTypeDetails(card));
    }

    dispatch(
      setPurchaseSavingsModal({
        status: true,
        payload: {
          category: category,
          subCat: item,
        },
      }),
    );
  };

  return (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.7} onPress={() => showInitiateModal()}>
      <View style={styles.productCardContent}>
        <View style={styles.productCardContentSub}>
          <Text style={styles.productCardContentSubTitle}>{item?.savingsMainCategoryCode}</Text>

          <IconSearch
            name="lock"
            size={17}
            style={[
              styles.searchIcon,
              {
                color: colors.greenColor,
                marginLeft: 7,
                fontWeight: "900",
                textAlign: "center",
                fontFamily: "MontserratBold",
              },
            ]}
          />
        </View>

        <Text style={styles.productCardContentTitle}>{item?.name}</Text>
        <View
          style={{ width: "100%", backgroundColor: "#fff", height: 3, paddingHorizontal: 40, marginBottom: 30 }}
        ></View>
        <View style={{ flexDirection: "row", marginBottom: 22, justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenColor,
                marginRight: 15,
                fontFamily: "Poppins",
              }}
            >
              Interest Rate
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
              }}
            >
              {item?.interestRate}%
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.greenColor,
                fontFamily: "Poppins",
                textAlign: "right",
              }}
            >
              Frequency
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#444",
                fontWeight: "600",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
                textAlign: "right",
              }}
            >
              {item?.frequency}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>
          <View></View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                flexDirection: "row",
                justifyContent: "flex-end",
                color: colors.greenColor,
                fontFamily: "Poppins",
                textAlign: "right",
              }}
            >
              Minimum Amount
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#444",
                fontWeight: "600",
                flexDirection: "row",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
                textAlign: "right",
              }}
            >
              ₦{addComma(item?.startAmount)}
            </Text>
          </View>
        </View>

        {/* <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={[styles.productButton, { backgroundColor: colors.greenColor }]} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: "92%",
    justifyContent: "center",
    // paddingHorizontal: 4,
    // paddingVertical: 15,
    // elevation: 1,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 10,
    backgroundColor: "rgba(24, 133, 111, 0.05)",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 20,
  },

  productCardContent: {
    paddingVertical: 19,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  productCardContentSub: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  productCardContentSubTitle: {
    fontSize: 17,
    // fontWeight: "800",
    fontFamily: "MontserratBold",
  },

  productCardContentTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 7,
    marginBottom: 20,
    fontFamily: "MontserratBold",
  },

  productButton: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});
export default SavingsCard;
