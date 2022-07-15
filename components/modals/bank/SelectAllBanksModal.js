import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBankModal,
  setDefaultBank,
  setSelectAllBankModal,
  setSelectedAllBank,
  setTransferToBankModal,
} from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconSearch from "react-native-vector-icons/AntDesign";
import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import NoItem from "../../extra/NoItem";
import AnimatedViewComp from "../../customs/AnimatedViewComp";

const { width } = Dimensions.get("screen");

const SelectAllBanksModal = () => {
  const modal = useSelector((state) => state.alert.selectAllBankModal);
  const selectedBank = useSelector((state) => state.alert.selectedAllBank);
  const countryInfo = useSelector((state) => state.oauth.countryInfo);
  const dispatch = useDispatch();
  const [allBanks, setAllBanks] = useState([]);
  const [searchBText, setSearchBText] = useState("");
  const [allFilterBanks, setAllFilterBanks] = useState([]);

  useEffect(() => {
    if (countryInfo && countryInfo.length) {
      let countryBanks = countryInfo.find((country) => country.code.toLowerCase() === "ng");
      if (countryBanks) {
        countryBanks = countryBanks?.countryBanks.slice().sort(function (a, b) {
          return a.name < b.name ? -1 : 1;
        });
        // console.log(countryBanks);
        setAllBanks(countryBanks);
        setAllFilterBanks(countryBanks);
      } else {
        setAllBanks([]);
        setAllFilterBanks([]);
      }
    }

    // console.log(countryInfo);
  }, [countryInfo]);

  useEffect(() => {
    if (searchBText) {
      let stringText = searchBText.toLowerCase();
      let newBank = allBanks.slice().filter((bank) => {
        return bank.name.toLowerCase().match(stringText);
      });
      setAllFilterBanks(newBank);
    } else {
      setAllFilterBanks(allBanks);
    }
  }, [searchBText]);

  const closeModal = () => {
    setAllFilterBanks(allBanks);
    setSearchBText("");
    dispatch(
      setSelectAllBankModal({
        status: false,
        type: "",
      }),
    );
  };

  const selectBank = (item) => {
    closeModal();
    dispatch(setSelectedAllBank(item));
    if (modal.type === "TRANSFER_TO_BANK") {
      dispatch(
        setTransferToBankModal({
          status: true,
          bank: item,
        }),
      );
    }
    // if (modal.type === "ADD_BANK") {
    //   setSelectedAllBank(item);
    // }
  };

  return (
    <Modal visible={modal?.status} animationType="fade" onRequestClose={() => closeModal()}>
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={{ marginTop: -40 }}>
        <View style={[{ backgroundColor: "#fff", width }]}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="arrow-left"
              size={33}
              style={[styles.modalHeaderIcon, { color: "#222" }]}
              onPress={() => closeModal()}
            />
            <Text style={styles.modalHeaderText}>Select Bank</Text>
            <Text></Text>
          </View>
          <View style={[styles.modalSearchContainer]}>
            <View style={[styles.modalSearch]}>
              <IconSearch name="search1" size={20} style={[styles.searchIcon, { color: colors.greenColor }]} />
              <TextInput
                value={searchBText}
                onChangeText={(text) => setSearchBText(text)}
                style={styles.searchInput}
                placeholder="Search bank..."
              />
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
          <View style={[styles.productContainer, { height: "100%" }]}>
            {allFilterBanks && allFilterBanks.length ? (
              <View style={{ marginBottom: 70 }}>
                {allFilterBanks?.map((item, index) => (
                  <AnimatedViewComp index={index} key={index}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      key={index}
                      style={styles.container}
                      onPress={() => selectBank(item)}
                    >
                      <View style={styles.content} key={index}>
                        <Text style={[styles.contentText, styles.contentText1]}>{item?.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </AnimatedViewComp>
                ))}
              </View>
            ) : (
              <View style={{ marginTop: 50 }}>
                <NoItem item={{ type: "", buttonText: "", message: "No Bank found" }} />
              </View>
            )}
          </View>
        </ScrollView>
        {/* <Banks /> */}
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,
    elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Montserrat",
    color: "#222",
    marginLeft: -45,
  },

  modalSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 7,
  },

  modalSearch: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    height: 55,
    // paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ced4ed",
    paddingVertical: 0,
  },

  searchIcon: {
    marginRight: 15,
  },

  searchInput: {
    fontSize: 16,
    color: "#444",
  },

  container: {
    width: "100%",
    justifyContent: "center",
    // backgroundColor: "transparent",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 2,
    elevation: 0,
  },

  content: {
    width: "95%",
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
    color: colors.greenColor,
  },
});
export default SelectAllBanksModal;
