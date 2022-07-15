import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setAllProductModal, setSubCategorySavingsModal } from "../../store/alert/alertSlice";
import LoadingComponents from "../loader/LoadingComponents";
import NoItem from "../extra/NoItem";
import { globalStyles } from "../../styles/global";

const AllSavings = () => {
  const savingsCategories = useSelector((state) => state.savings.SavingsCategories);
  const loading = useSelector((state) => state.savings.catLoading);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goToSubCategory = (item) => {
    dispatch(
      setSubCategorySavingsModal({
        status: true,
        payload: item,
      }),
    );
  };

  return (
    <View style={styles.wrapper}>
      {loading ? (
        <View
          style={{
            marginTop: 40,
            backgroundColor: "#fff",
            padding: 30,
            alignItems: "center",
            paddingTop: 50,
            height: "100%",
            width: "100%",
          }}
        >
          <LoadingComponents />
          <Text style={globalStyles.label}>Loading categories...</Text>
        </View>
      ) : savingsCategories && savingsCategories.length ? (
        <>
          <Text
            style={{
              marginTop: 0,
              textAlign: "center",
              fontFamily: "PoppinsBold",
              fontSize: 17,
              fontWeight: "600",
              marginBottom: 40,
            }}
          >
            Choose a plan
          </Text>

          {savingsCategories?.map((item, index) => (
            <TouchableOpacity style={styles.container} key={index} onPress={() => goToSubCategory(item)}>
              <Icon name="leaf-maple" size={20} style={[styles.Icon, { color: colors.greenColor }]} />
              <View style={styles.content}>
                <Text style={[styles.contentText, styles.contentText1]}>{item?.name}</Text>
                <Text style={[styles.contentText, styles.contentText2]}>
                  {item?.savingsCategories?.length} Available plan
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <View style={{ marginTop: 40 }}>
          <NoItem item={{ type: "SAVINGS", buttonText: "", message: "No available savings plan" }} />
        </View>
      )}

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
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
    fontFamily: "PoppinsBold",
  },

  contentText2: {
    fontSize: 14,
  },
});

export default AllSavings;
