import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import BankItem from "./BankItem";
import NoItem from "../../extra/NoItem";
import colors from "../../../styles/colors";

const Banks = () => {
  const [hasBank] = useState(true);
  return (
    <View>
      <ScrollView>
        <View style={[styles.productContainer]}>
          <View style={styles.bankGrid}>
            {hasBank ? (
              <>
                <BankItem />
                {/* <BankItem />
                <BankItem />
                <BankItem /> */}
              </>
            ) : (
              <NoItem item={{ type: "BANK", buttonText: "Add Bank", message: "You haven't added any bank accounts" }} />
            )}
          </View>
        </View>
      </ScrollView>
      {hasBank && (
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
    paddingTop: 40,
    paddingBottom: 90,
  },

  bankGrid: {
    width: "92%",
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
export default Banks;
