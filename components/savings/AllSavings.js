import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setAllProductModal, setSubCategorySavingsModal } from "../../store/alert/alertSlice";

const AllSavings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goToSubCategory = () => {
    dispatch(
      setSubCategorySavingsModal({
        status: true,
        payload: null,
      }),
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text
        style={{
          marginTop: 0,
          textAlign: "center",
          fontFamily: "Poppins",
          fontSize: 19,
          fontWeight: "700",
          marginBottom: 40,
        }}
      >
        Choose a plan
      </Text>
      <TouchableOpacity style={styles.container} onPress={() => goToSubCategory()}>
        <Icon name="leaf-maple" size={20} style={[styles.Icon, { color: colors.greenColor }]} />
        <View style={styles.content}>
          <Text style={[styles.contentText, styles.contentText1]}>Standard Savings</Text>
          <Text style={[styles.contentText, styles.contentText2]}>4 Available products</Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.container}>
        <Icon name="wallet-outline" size={20} style={[styles.Icon, { color: colors.greenColor }]} />
        <View style={styles.content}>
          <Text style={[styles.contentText, styles.contentText1]}>Savings</Text>
          <Text style={[styles.contentText, styles.contentText2]}>4 Available saving plan</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 30,
    elevation: 2,
  },

  Icon: {
    marginRight: 30,
    fontSize: 50,
  },

  contentText: {
    fontFamily: "Poppins",
  },

  contentText1: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 5,
  },

  contentText2: {
    fontSize: 14,
  },
});

export default AllSavings;
