import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CardItem from "./CardItem";
import NoItem from "../../extra/NoItem";
import colors from "../../../styles/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { setAddCardModal } from "../../../store/alert/alertSlice";
import { useDispatch } from "react-redux";

const Cards = () => {
  const dispatch = useDispatch();
  const [hasCard] = useState(false);

  const addCard = () => {
    dispatch(setAddCardModal(true));
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.productContainer]}>
          <View style={styles.bankGrid}>
            {hasCard ? (
              <>
                <CardItem />
                {/* <CardItem />
                <CardItem />
                <CardItem /> */}
              </>
            ) : (
              <NoItem item={{ type: "CARD", buttonText: "Add Card", message: "You haven't added any card" }} />
            )}
          </View>
        </View>
      </ScrollView>
      {hasCard && (
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
      )}
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
