import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../../../styles/colors";
import RadioGroup from "react-native-radio-buttons-group";
import { Dropdown } from "react-native-element-dropdown";
import { globalStyles } from "../../../../styles/global";

const EditProfileForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [relationship, setRelationship] = useState("sibling");

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

  const Relationships = ["spouse", "parent", "child", "sibling", "other"];

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    setGender(radioButtonsArray.value);
  }

  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.form}>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Full name</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            autoCorrect={false}
            placeholder="Enter full name"
            style={globalStyles.inputTextt}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Email</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
            placeholder="Enter email"
            style={globalStyles.inputTextt}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Phone</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            autoCorrect={false}
            keyboardType="numeric"
            placeholder="Enter phone"
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
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Select Country</Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.shadow}
          data={Relationships}
          labelField="label"
          // valueField={relationship}
          label="Dropdown"
          placeholder="Select relationship"
          value={relationship}
          onChange={(item) => {
            setRelationship(item);
          }}
          // renderLeftIcon={() => <Image style={styles.icon} source={require("./assets/account.png")} />}
          renderItem={(item) => _renderItem(item)}
          textError="Error"
        />
        {/* <SelectDropdown
          style={{ width: "100%" }}
          buttonStyle={{ width: "100%" }}
          dropdownStyle={{ height: "100%", position: "absolute", top: 0 }}
          data={allCountries}
          // search={true}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
        /> */}
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
  },
  inputTextt: {
    color: "#333",
    flex: 1,
    fontSize: 17,
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
