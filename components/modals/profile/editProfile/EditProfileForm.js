import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../styles/colors";
import RadioGroup from "react-native-radio-buttons-group";
// import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from "react-native-element-dropdown";
import { globalStyles } from "../../../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { setCountryModal, setLoading } from "../../../../store/alert/alertSlice";
import { SvgUri } from "react-native-svg";

const EditProfileForm = () => {
  const dispatch = useDispatch();
  // const [allCountries] = useState(countries);
  const [country, setCountry] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");

  const selectedCountry = useSelector((state) => state.alert.selectedCountry);

  // useEffect(() => {
  //   console.log(countries);
  // }, []);
  const radioButtonsData = [
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Male",
      value: "male",
    },
    {
      id: "2",
      label: "Female",
      value: "female",
    },
  ];

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    setGender(radioButtonsArray.value);
  }

  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        <Image style={styles.selectImage} source={{ uri: item.flag }} />
      </View>
    );
  };

  const selectUserCountry = () => {
    dispatch(
      setCountryModal({
        status: true,
        type: "PROFILE",
        selected: selectedCountry,
        payload: null,
      }),
    );
  };

  return (
    <View style={styles.form}>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Middle name</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            value={middleName}
            onChangeText={(text) => setMiddleName(text)}
            autoCorrect={false}
            placeholder="Enter middle name"
            style={globalStyles.inputTextt}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Select Gender</Text>
        <RadioGroup
          value={gender}
          containerStyle={{ flexDirection: "row", fontFamily: "Poppins", letterSpacing: -0.35644 }}
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        />
      </View>
      {/* <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Select Country</Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.shadow}
          data={countries()}
          labelField="label"
          valueField={country}
          label="Dropdown"
          placeholder="Select country"
          value={country}
          onChange={(item) => {
            setCountry(item.name);
            console.log("selected", item.name);
          }}
          // renderLeftIcon={() => <Image style={styles.icon} source={require("./assets/account.png")} />}
          renderItem={(item) => _renderItem(item)}
          textError="Error"
        />
      
      </View> */}

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Select country</Text>
        <TouchableOpacity style={[styles.inputContainer, { height: 50 }]} onPress={() => selectUserCountry()}>
          {selectedCountry && (
            <View style={[{ width: 20, height: 25, borderRadius: 100, marginRight: 10 }]}>
              <SvgUri width="100%" height="100%" uri={selectedCountry?.flag} />
            </View>
          )}

          <TextInput value={selectedCountry?.name} editable={false} style={globalStyles.inputTextt} />
          <FontAwesome5Icon name="chevron-circle-down" size={16} color="#666" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Address</Text>
        <View style={[styles.inputContainer, { height: 60 }]}>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            autoCorrect={false}
            style={globalStyles.inputTextt}
          />
        </View>
      </View>

      <View style={{ marginTop: 20, width: "100%" }}>
        <TouchableOpacity activeOpacity={0.7} style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "90%",
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  inputContainer: {
    height: 55,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.greenColor,
    alignItems: "center",
    borderRadius: 8,
  },

  dropdown: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.greenColor,
    marginTop: 0,
    padding: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },

  selectImage: {
    marginRight: 5,
    width: 18,
    height: 18,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingHorizontal: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});

export default EditProfileForm;
