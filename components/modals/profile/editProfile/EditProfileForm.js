import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../styles/colors";
// import RadioGroup from "react-native-radio-buttons-group";
import RadioForm from "react-native-simple-radio-button";
// import SelectDropdown from "react-native-select-dropdown";
// import { Dropdown } from "react-native-element-dropdown";
import { globalStyles } from "../../../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { setAlertModal, setCountryModal, setLoading } from "../../../../store/alert/alertSlice";
import { SvgUri } from "react-native-svg";
import { getUserInfo } from "../../../../store/auth/actions";
import axios from "axios";
import { serializeJSON } from "../../../helpers/globalFunction";
import CustomLoadingButton from "../../../customs/CustomLoadingButton";

const EditProfileForm = ({ handleLoading }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const [country, setCountry] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [emptyFields, setEmptyFields] = useState(true);

  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);
  const selectedCountry = useSelector((state) => state.alert.selectedCountry);

  useEffect(() => {
    setCountry(user?.countryName || "Nigeria");
    setMiddleName(user?.middleName || "");
    setAddress(user?.homeAddress || "");
    setGender(user?.gender || "");
  }, [user]);

  useEffect(() => {
    if (middleName === "" && address === "") {
      setEmptyFields(true);
    } else {
      setEmptyFields(false);
    }
  }, [selectedCountry, middleName, address, gender]);

  useEffect(() => {
    if (selectedCountry) {
      setCountry(selectedCountry?.name || "Nigeria");
    }
  }, [selectedCountry]);

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

  const updateUserProfile = () => {
    if (emptyFields === true) {
      return;
    }

    setEmptyFields(true);
    handleLoading(true);

    axios
      .post(
        `${baseURL}/v1.0/User/updateUserInfo`,
        serializeJSON({
          AppId: AppId,
          RequestId: RequestId,
          Email: user?.email,
          UserCode: user?.code,
          BVN: user?.bvn,
          HomeAddress: address,
          PhoneNumber: user?.phoneNumber,
          SubsidiaryCode: user?.subsidiaryCode,
          Country: selectedCountry ? selectedCountry.isoCode : country,
          Gender: gender,
          DateOfBirth: user?.dateOfBirth,
          FirstName: user?.firstName,
          LastName: user?.lastName,
          MiddleName: middleName,
          PhotoFile: null,
        }),
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
          },
        },
      )
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          handleLoading(false);
          setEmptyFields(false);

          dispatch(
            setAlertModal({
              status: true,
              type: "SUCCESS",
              title: "Profile Updated",
              des: response.data.message,
              payload: null,
            }),
          );

          dispatch(getUserInfo(user?.code));
        } else {
          handleLoading(false);

          dispatch(
            setAlertModal({
              status: true,
              type: "error",
              title: " Error",
              des: response.data.message,
              payload: null,
            }),
          );
        }
      })
      .catch(() => {
        handleLoading(false);

        dispatch(
          setAlertModal({
            status: true,
            type: "error",
            title: "Service Error",
            des: "Service is temporarily unavailable. Please try again in a few minutes.",
            payload: null,
          }),
        );
      });
  };

  return (
    <View style={styles.form}>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Middle name</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            value={middleName}
            autoFocus={true}
            onChangeText={(text) => setMiddleName(text.replace(/\s/g, ""))}
            autoCorrect={false}
            placeholder="Enter middle name"
            style={globalStyles.inputTextt}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Select Gender</Text>
        {/* <RadioGroup
          value={gender}
          containerStyle={{ flexDirection: "row", fontFamily: "Poppins", letterSpacing: -0.35644 }}
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        /> */}

        <RadioForm
          radio_props={radioButtonsData}
          // initial={0}
          buttonColor={colors.greenColor}
          selectedButtonColor={colors.greenColor}
          formHorizontal={true}
          animation={true}
          isSelected={!!radioButtonsData.find((item) => item === gender)}
          labelStyle={{
            fontSize: 20,
            fontFamily: "Poppins",
            letterSpacing: -0.35644,
            paddingTop: 5,
            marginRight: 20,
          }}
          onPress={(value) => {
            setGender(value);
          }}
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

          <TextInput
            value={selectedCountry ? selectedCountry?.name : country}
            editable={false}
            style={globalStyles.inputTextt}
          />
          <FontAwesome5Icon name="chevron-circle-down" size={16} color="#666" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>Address</Text>
        <View style={[styles.inputContainer, { height: 60 }]}>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            multiline={true}
            autoCorrect={false}
            style={[globalStyles.inputTextt, { textAlign: "left", width: "100%" }]}
          />
        </View>
      </View>

      <View style={{ marginTop: 20, width: "100%" }}>
        {/* <TouchableOpacity
          onPress={() => updateUserProfile()}
          activeOpacity={0.7}
          style={[globalStyles.button, emptyFields && { backgroundColor: colors.greenLightDarkColor }, { height: 60 }]}
          disabled={emptyFields}
        >
          <Text style={globalStyles.buttonText}>Update</Text>
        </TouchableOpacity> */}

        <CustomLoadingButton
          onPress={() => updateUserProfile()}
          emptyFields={emptyFields}
          buttonText={"Update"}
          loading={false}
        />
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
