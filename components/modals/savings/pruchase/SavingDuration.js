import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../../../styles/colors";
import RadioForm from "react-native-simple-radio-button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { globalStyles } from "../../../../styles/global";
import { removeFormatDate } from "../../../helpers/globalFunction";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const SavingDuration = ({ setDuration }) => {
  const [selectedCustom, setSelectedCustom] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const radioButtonsData = [
    {
      label: "3 Months",
      value: "3",
    },
    {
      label: "5 Months",
      value: "5",
    },
    {
      label: "6 Months",
      value: "6",
    },
    {
      label: "12 Months",
      value: "12",
    },
    {
      label: "I'll choose my preferred maturity date",
      value: "custom",
    },
  ];

  const selectedValue = (value) => {
    if (value === "custom") {
      setSelectedCustom(true);
      setDuration("");
    } else {
      setSelectedCustom(false);
      setDuration(value);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    setDuration(date);
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.productContainer]}>
        <View style={{ marginTop: 30, marginBottom: 10, width: "95%", paddingRight: 10 }}>
          <Text
            style={[
              styles.productCardContentItemLeft,
              {
                fontSize: 29,
                marginBottom: 35,
                fontWeight: "700",
                color: colors.greenDarkDarkColor,
                fontFamily: "Poppins",
                letterSpacing: -0.35644,
              },
            ]}
          >
            How long would you like to save?
          </Text>
          <View style={{ marginTop: 20, marginBottom: 0 }}>
            <RadioForm
              radio_props={radioButtonsData}
              // initial={0}
              buttonColor={colors.greenColor}
              selectedButtonColor={colors.greenColor}
              animation={true}
              labelStyle={{
                fontSize: 20,
                fontFamily: "Poppins",
                letterSpacing: -0.35644,
                marginTop: 5,
                marginBottom: 20,
              }}
              onPress={(value) => {
                selectedValue(value);
              }}
            />
          </View>
        </View>
        {selectedCustom ? (
          <View style={{ marginBottom: 40, width: "93%" }}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity style={[styles.inputContainer, { height: 60 }]} onPress={showDatePicker}>
              <Icon name="calendar-today" size={22} color="#888" style={{ marginRight: 10 }} />
              <View style={globalStyles.inputTextt}>
                <Text style={{ fontSize: 20, fontFamily: "Poppins", letterSpacing: -0.35644 }}>
                  {removeFormatDate(date)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    alignItems: "center",
  },

  inputContainer: {
    height: 55,
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ced4ed",
    alignItems: "center",
    borderRadius: 8,
  },
});

export default SavingDuration;
