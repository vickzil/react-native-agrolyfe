import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../styles/colors";
import RadioForm from "react-native-simple-radio-button";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { globalStyles } from "../../../../styles/global";
import POPUpModal from "../../POPUpModal";
import { useDispatch, useSelector } from "react-redux";
import CustomLoadingButton from "../../../customs/CustomLoadingButton";
import axios from "axios";
import { setAlertModal } from "../../../../store/alert/alertSlice";
import { getUserInfo } from "../../../../store/auth/actions";
import AnimatedViewComp from "../../../customs/AnimatedViewComp";

const EditProfileForm = ({ isLoading, setIsLoading, theme }) => {
  const user = useSelector((state) => state.oauth.user);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [relationship, setRelationship] = useState("sibling");
  const [showRelationshipModal, setShowRelationshipModal] = useState(false);

  const [emptyFields, setEmptyFields] = useState(true);

  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

  useEffect(() => {
    setFullName(user?.nextOfKinName || "");
    setEmail(user?.nextOfKinEmail || "");
    setPhone(user?.nextOfKinPhoneNumber || "");
    setAddress(user?.nextOfKinAddress || "");
    setGender(user?.nextOfKinGender || "male");
    setRelationship(user?.nextOfKinRelationship || "sibling");
  }, [user]);

  useEffect(() => {
    if (fullName === "" && email === "" && phone === "" && relationship === "") {
      setEmptyFields(true);
    } else {
      setEmptyFields(false);
    }
  }, [relationship, fullName, email, phone]);

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

  const updateNextOfKin = () => {
    if (emptyFields === true) {
      return;
    }

    setEmptyFields(true);
    setIsLoading(true);

    axios
      .post(
        `${baseURL}/v1.0/User/updateUserNextOfKin`,
        {
          AppId: AppId,
          RequestId: RequestId,
          Email: user?.email,
          UserCode: user?.code,
          FirstName: user?.firstName,
          LastName: user?.lastName,
          MiddleName: user?.middleName,
          NextOfKinName: fullName,
          NextOfKinPhoneNumber: phone,
          NextOfKinEmail: email,
          NextOfKinAddress: address,
          NextOfKinRelationship: relationship,
          NextOfKinGender: gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
          },
        },
      )
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          setIsLoading(false);
          setEmptyFields(false);

          dispatch(
            setAlertModal({
              status: true,
              type: "SUCCESS",
              title: "Next of Kin updated",
              des: response.data.message,
              payload: null,
            }),
          );

          dispatch(getUserInfo(user?.code));
        } else {
          setIsLoading(false);

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
        setIsLoading(false);

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
      <POPUpModal visible={showRelationshipModal} setVisible={setShowRelationshipModal} modalTitle=" Relationship">
        <View>
          {Relationships?.map((item, index) => (
            <AnimatedViewComp index={index} key={index}>
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                style={[
                  globalStyles.selectContainer,
                  relationship == item ? globalStyles.selectedItem : null,
                  theme === "dark" && globalStyles.cardDark,
                ]}
                onPress={() => {
                  setShowRelationshipModal(false);
                  setRelationship(item);
                }}
              >
                <View style={globalStyles.selectContent} key={index}>
                  <Text
                    style={[
                      globalStyles.selectContentText,
                      globalStyles.selectContentText1,
                      theme === "dark" && globalStyles.textLight,
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            </AnimatedViewComp>
          ))}
        </View>
      </POPUpModal>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={[styles.label, theme === "dark" && globalStyles.textLight]}>Full name</Text>
        <View style={[styles.inputContainer, theme === "dark" && globalStyles.cardDark]}>
          <TextInput
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            autoCorrect={false}
            placeholder="Enter full name"
            placeholderTextColor={theme === "dark" ? "#fff" : "444"}
            style={[globalStyles.inputTextt, theme === "dark" && globalStyles.textLight]}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={[styles.label, theme === "dark" && globalStyles.textLight]}>Email</Text>
        <View style={[styles.inputContainer, theme === "dark" && globalStyles.cardDark]}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
            placeholder="Enter email"
            placeholderTextColor={theme === "dark" ? "#fff" : "444"}
            style={[globalStyles.inputTextt, theme === "dark" && globalStyles.textLight]}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={[styles.label, theme === "dark" && globalStyles.textLight]}>Phone</Text>
        <View style={[styles.inputContainer, theme === "dark" && globalStyles.cardDark]}>
          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            autoCorrect={false}
            keyboardType="numeric"
            placeholder="Enter phone"
            placeholderTextColor={theme === "dark" ? "#fff" : "444"}
            style={[globalStyles.inputTextt, theme === "dark" && globalStyles.textLight]}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={[styles.label, theme === "dark" && globalStyles.textLight]}>Select Gender</Text>
        {/* <RadioGroup
          value={gender}
          containerStyle={{ flexDirection: "row", fontFamily: "Poppins", letterSpacing: -0.35644 }}
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        /> */}

        <RadioForm
          radio_props={radioButtonsData}
          // initial={0}
          buttonColor={theme === "dark" ? "#fff" : colors.greenColor}
          selectedButtonColor={theme === "dark" ? "#fff" : colors.greenColor}
          formHorizontal={true}
          animation={true}
          isSelected={!!radioButtonsData.find((item) => item === gender)}
          labelStyle={{
            fontSize: 15,
            fontFamily: "Poppins",
            letterSpacing: -0.35644,
            marginTop: 5,
            marginRight: 20,
            color: theme === "dark" && "#fff",
          }}
          onPress={(value) => {
            setGender(value);
          }}
        />
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={[styles.label, theme === "dark" && globalStyles.textLight]}>Select Relationship</Text>
        <TouchableOpacity
          style={[styles.inputContainer, { height: 50 }, theme === "dark" && globalStyles.cardDark]}
          onPress={() => setShowRelationshipModal(true)}
        >
          <TextInput
            value={relationship}
            editable={false}
            style={[globalStyles.inputTextt, theme === "dark" && globalStyles.textLight]}
          />
          <FontAwesome5Icon name="chevron-circle-down" size={16} color="#666" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={[styles.label, theme === "dark" && globalStyles.textLight]}>Address</Text>
        <View style={[styles.inputContainer, { height: 60 }, theme === "dark" && globalStyles.cardDark]}>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholderTextColor={theme === "dark" ? "#fff" : "444"}
            multiline={true}
            autoCorrect={false}
            style={[globalStyles.inputTextt, { textAlign: "left", width: "100%" }]}
          />
        </View>
      </View>
      <View style={{ marginTop: 20, width: "100%" }}>
        {/* <TouchableOpacity activeOpacity={0.7} style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Update</Text>
        </TouchableOpacity> */}

        <CustomLoadingButton
          onPress={() => updateNextOfKin()}
          emptyFields={emptyFields}
          buttonText={"Update"}
          loading={isLoading}
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
    fontSize: 15,
    color: "#444",
    marginBottom: 10,
  },
  inputTextt: {
    color: "#333",
    flex: 1,
    fontSize: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  inputContainer: {
    height: 55,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ced4ed",
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
    fontSize: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});

export default EditProfileForm;
