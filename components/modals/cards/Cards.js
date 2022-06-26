import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CardItem from "./CardItem";
import NoItem from "../../extra/NoItem";
import colors from "../../../styles/colors";

const Cards = () => {
  const [hasCard] = useState(false);
  return (
    <View>
      <ScrollView>
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
        <TouchableOpacity style={[styles.buttonFloat, { backgroundColor: colors.greenColor }]}>
          <Text style={styles.buttonFloatText}>Add Bank</Text>
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
    right: 10,
    top: 520,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 80,
    elevation: 5,
  },

  buttonFloatText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    color: "#fff",
  },
});
export default Cards;
