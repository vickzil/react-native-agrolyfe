import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
const image = require("../../../assets/img/cardimage.jpg");
const card = require("../../../assets/img/verve.png");

const CardItem = () => {
  return (
    <ImageBackground source={image} resizeMode="cover" imageStyle={{ borderRadius: 17 }} style={styles.image}>
      <View style={styles.gridItem}>
        <Text style={styles.gridItemHeaderText}>0719768893</Text>
        <View style={styles.gridItemNumber}>
          <Text style={styles.gridItemParaNum}>****</Text>
          <Text style={styles.gridItemParaNum}>****</Text>
          <Text style={styles.gridItemParaNum}>****</Text>
          <Text style={styles.gridItemParaNum}>7856</Text>
        </View>
        <Text style={styles.gridItemParaText}>Access Bank</Text>
        <View style={styles.validTru}>
          <View>
            <Text style={[styles.gridItemBottomParaText, styles.gridItemBottomParaText1]}>Valid THRU</Text>
            <Text style={styles.gridItemBottomParaText}>01/22</Text>
          </View>
          <View style={styles.cardImage}>
            <Image source={card} style={[{ width: 80, height: 70, borderRadius: 100 }]} resizeMode="contain" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  gridItem: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 38,
    paddingBottom: 10,
    // borderWidth: 1,
    // borderColor: "#e5e5e5",
    // elevation: 3,

    // backgroundColor: "#fff",
  },

  gridItemNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 15,
  },

  gridItemParaNum: {
    fontWeight: "900",
    fontSize: 19,
    color: "#fff",
  },

  gridItemHeaderText: {
    textAlign: "left",
    fontSize: 19,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Poppins",
    color: "#fff",
  },

  gridItemParaText: {
    textAlign: "left",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
    fontFamily: "Poppins",
    textTransform: "uppercase",
    color: "#fff",
    // letterSpacing: 2,
  },

  validTru: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardImage: {
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    // marginTop: -60,
  },

  gridItemBottomParaText: {
    textAlign: "left",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Poppins",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#fff",
  },

  gridItemBottomParaText1: {
    color: "#bbb",
  },
});
export default CardItem;
