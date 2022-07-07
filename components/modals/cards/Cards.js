import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import NoItem from "../../extra/NoItem";
import colors from "../../../styles/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { setAddCardModal } from "../../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponents from "../../loader/LoadingComponents";

const Cards = () => {
  const walletOptions = useSelector((state) => state.wallet.walletOptions);
  const loading = useSelector((state) => state.wallet.optionLoading);
  const dispatch = useDispatch();

  const [hasCard] = useState(false);
  const [cards, setCards] = useState([]);

  const addCard = () => {
    dispatch(setAddCardModal(true));
  };

  useEffect(() => {
    if (walletOptions) {
      setCards(walletOptions?.bySavedCards);
    }
  }, [walletOptions]);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.productContainer]}>
          <View style={styles.bankGrid}>
            {loading ? (
              <View style={{ marginTop: 40 }}>
                <LoadingComponents />
              </View>
            ) : cards && cards.length ? (
              cards?.map((item, index) => <CardItem item={item} key={index} index={index} />)
            ) : (
              <View style={{ marginTop: 40 }}>
                <NoItem item={{ type: "CARD", buttonText: "Add Card", message: "You haven't added any card" }} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {cards && cards.length ? (
        <TouchableOpacity style={[styles.buttonFloat]} onPress={() => addCard()}>
          <Text style={styles.buttonFloatText}>
            <MaterialIcons
              name="add"
              size={40}
              style={[{ color: "#fff" }]}
              // onPress={() => dispatch(setBankModal(false))}
            />
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: 30,
    paddingBottom: 190,
  },

  bankGrid: {
    width: "97%",
    justifyContent: "center",
  },

  buttonFloat: {
    position: "absolute",
    right: 15,
    top: 520,
    // paddingVertical: 10,
  },

  buttonFloatText: {
    backgroundColor: colors.greenColor,
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "normal",
    fontWeight: "700",
    margin: 0,
    fontFamily: "Poppins",
    color: "#fff",
    padding: 12,
    borderRadius: 80,
    elevation: 1,
  },
});
export default Cards;
