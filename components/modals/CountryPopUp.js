import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconSearch from "react-native-vector-icons/AntDesign";
import colors from "../../styles/colors";
import { countries } from "../../api/countries/countries";
import { useDispatch, useSelector } from "react-redux";
import { setCountryModal, setSelectedCountry } from "../../store/alert/alertSlice";
import { SvgUri } from "react-native-svg";

const { width } = Dimensions.get("screen");

const CountryPopUp = () => {
  const modal = useSelector((state) => state.alert.countryModal);
  const allCountries = useSelector((state) => state.alert.allCountries);
  const dispatch = useDispatch();

  const [searchCText, setSearchCText] = useState("");
  const [currentCountries, setCurrentCountries] = useState(allCountries);

  useLayoutEffect(() => {
    let newCountries = allCountries.filter((country) => {
      return (
        country.name.toLowerCase().match(searchCText.toLowerCase()) ||
        country.isoCode.toLowerCase().match(searchCText.toLowerCase())
      );
    });

    setCurrentCountries(newCountries);
  }, [searchCText]);

  useLayoutEffect(() => {
    if (modal?.status === false) {
      setCurrentCountries(allCountries);
      setSearchCText("");
    }
  }, [modal?.status]);

  const closeModal = () => {
    dispatch(
      setCountryModal({
        status: false,
        type: "",
        selected: "",
        payload: null,
      }),
    );
  };

  const selectCountry = (value) => {
    dispatch(setSelectedCountry(value));
    closeModal();
  };

  return (
    <Modal
      visible={modal.status}
      animationType="fade"
      onRequestClose={() => {
        closeModal();
      }}
      style={{ marginBottom: 0 }}
    >
      <View style={{ flex: 1, backgroundColor: "#f8f8f8", marginBottom: 0 }}>
        <View style={{ backgroundColor: colors.greenDarkColor }}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="arrow-left"
              size={25}
              style={[styles.modalHeaderIcon, { color: "#fff" }]}
              onPress={() => closeModal()}
            />
            <Text style={styles.modalHeaderText}>Select Country</Text>
            <Text></Text>
          </View>

          <View style={[styles.modalSearchContainer]}>
            <View style={[styles.modalSearch]}>
              <IconSearch
                name="search1"
                size={20}
                style={[styles.searchIcon, { color: colors.greenColor }]}
                onPress={() => goBack()}
              />
              <TextInput
                value={searchCText}
                onChangeText={(text) => setSearchCText(text)}
                style={styles.searchInput}
                placeholder="Search country..."
              />
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            <View style={styles.countryWrapper}>
              {currentCountries?.map((item, index) => (
                <TouchableOpacity
                  style={styles.countryItems}
                  key={index}
                  item={item}
                  index={index}
                  onPress={() => selectCountry(item)}
                >
                  <View style={[{ width: 20, height: 25, borderRadius: 100 }]}>
                    <SvgUri width="100%" height="100%" uri={item.flag} />
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontWeight: "800", fontSize: 11 }}>{item.dialCode}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* <Text>Here oo</Text> */}
          </View>
        </ScrollView>
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
    // elevation: 3,
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
    color: "#fff",
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
    paddingBottom: 20,
  },

  modalSearch: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ced4ed",
  },

  searchIcon: {
    marginRight: 15,
  },

  searchInput: {
    fontSize: 16,
    color: "#444",
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },

  countryWrapper: {
    width: "90%",
    justifyContent: "flex-start",
    padding: 15,
    marginRight: 30,
  },

  countryItems: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: "#d9d9d9",
  },
});
export default CountryPopUp;
