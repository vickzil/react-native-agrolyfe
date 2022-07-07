import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
const image = require("../../../assets/img/cardimage.jpg");
const verveCard = require("../../../assets/img/verve.png");
const masterCard = require("../../../assets/img/master-card.png");
const visaCard = require("../../../assets/img/visa.png");

const CardItem = ({ item }) => {
  return (
    <ImageBackground source={image} resizeMode="cover" imageStyle={{ borderRadius: 17 }} style={styles.image}>
      <View style={styles.gridItem}>
        <Text style={styles.gridItemHeaderText}>{item ? item.cardFirstName + " " + item.cardLastName : "-----"}</Text>
        <View style={styles.gridItemNumber}>
          <Text style={styles.gridItemParaNum}>****</Text>
          <Text style={styles.gridItemParaNum}>****</Text>
          <Text style={styles.gridItemParaNum}>****</Text>
          <Text style={styles.gridItemParaNum}>{item.cardLast4}</Text>
        </View>
        <Text style={styles.gridItemParaText}>{item.cardBankName}</Text>
        <View style={styles.validTru}>
          <View>
            <Text style={[styles.gridItemBottomParaText, styles.gridItemBottomParaText1]}>Valid THRU</Text>
            <Text style={styles.gridItemBottomParaText}>
              {item.cardExpireMonth}/{item.cardExpireMonth.slice(-2)}
            </Text>
          </View>
          <View style={styles.cardImage}>
            {item.cardType.indexOf("verve DEBIT") >= 0 ? (
              <Image source={verveCard} style={[{ width: 80, height: 70, borderRadius: 100 }]} resizeMode="contain" />
            ) : null}
            {item.cardType.indexOf("master card DEBIT") >= 0 ? (
              <Image source={masterCard} style={[{ width: 80, height: 70, borderRadius: 100 }]} resizeMode="contain" />
            ) : null}
            {item.cardType.indexOf("visa DEBIT") >= 0 ? (
              <Image source={visaCard} style={[{ width: 80, height: 70, borderRadius: 100 }]} resizeMode="contain" />
            ) : null}
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
