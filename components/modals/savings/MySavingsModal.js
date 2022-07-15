import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMySavingsModal, setSavingsModal } from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import IconSearch from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MySavingsCard from "../../savings/MySavingsCard";
import LoadingComponents from "../../loader/LoadingComponents";
import { globalStyles } from "../../../styles/global";
import NoItem from "../../extra/NoItem";
import NoSavingsPlan from "./NoSavingsPlan";

const { width } = Dimensions.get("screen");

const MySavingsModal = () => {
  const modal = useSelector((state) => state.alert.mySavingsModal);
  const savings = useSelector((state) => state.savings.mySavings);
  const loading = useSelector((state) => state.savings.myLoading);
  const [mySavings, setMySavings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (savings) {
      let newSavings = savings.slice().sort(function (a, b) {
        return a.createdOn < b.createdOn ? -1 : 1;
      });

      setMySavings(newSavings);
    }
  }, [savings]);

  const closeModal = () => {
    dispatch(setMySavingsModal(false));
  };

  return (
    <Modal visible={modal} animationType="slide" onRequestClose={() => closeModal()}>
      {modal && (
        <View>
          <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
        </View>
      )}
      <View style={{ flex: 1, marginTop: -10 }}>
        <View style={[styles.modalHeader, { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={33}
            style={[styles.modalHeaderIcon, { color: "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>My Savings</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={[styles.modalSearchContainer]}>
            <View style={[styles.modalSearch]}>
              <IconSearch name="search1" size={20} style={[styles.searchIcon, { color: colors.greenColor }]} />
              <TextInput style={styles.searchInput} placeholder="Search..." />
            </View>
          </View> */}
          <View style={[styles.productContainer]}>
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
                <Text style={globalStyles.label}>Loading my savings...</Text>
              </View>
            ) : mySavings && mySavings.length ? (
              mySavings?.map((item, index) => <MySavingsCard key={index} item={item} index={index} />)
            ) : (
              <NoSavingsPlan />
            )}
          </View>
        </ScrollView>

        {mySavings && mySavings.length ? (
          <TouchableOpacity style={[styles.buttonFloat]} activeOpacity={0.4}>
            <Text
              style={styles.buttonFloatText}
              onPress={() => {
                dispatch(setSavingsModal(true));
                closeModal();
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="add" size={27} style={[{ color: "#fff", margin: 0, padding: 0 }]} />
                <Text
                  style={[
                    {
                      color: "#fff",
                      marginLeft: 10,
                      marginBottom: 0,
                      marginTop: 0,
                      padding: 0,
                      fontSize: 18,
                    },
                  ]}
                >
                  Start saving
                </Text>
              </View>
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "PoppinsBold",
    color: "#111",
    marginLeft: -45,
  },

  modalSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 30,
  },

  modalSearch: {
    width: "98%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  searchIcon: {
    marginRight: 15,
  },

  searchInput: {
    fontSize: 16,
    color: "#444",
  },

  productContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 90,
  },

  buttonFloat: {
    position: "absolute",
    right: 18,
    bottom: 120,
    // paddingVertical: 10,
  },

  buttonFloatText: {
    width: "100%",
    backgroundColor: colors.greenColor,
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "normal",
    fontWeight: "700",
    margin: 0,
    fontFamily: "Poppins",
    color: "#fff",
    padding: 15,
    borderRadius: 80,
    elevation: 1,
  },
});

export default MySavingsModal;
