import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";
import { setAddbvnModal, setBvnModal } from "../../../../store/alert/alertSlice";
import { useDispatch } from "react-redux";

const BvnForm = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.form}>
      <View
        style={{
          marginBottom: 40,
          width: "100%",
        }}
      >
        <Text
          style={[
            styles.label,
            {
              fontWeight: "600",
              fontSize: 18,
              textAlign: "center",
              color: colors.greenColor,
              fontFamily: "PoppinsBold",
            },
          ]}
        >
          Why do we need your BVN ?
        </Text>

        <View
          style={[
            {
              marginTop: 40,
              textAlign: "center",
              borderWidth: 1,
              borderColor: "#ced4ce",
              paddingVertical: 22,
              paddingHorizontal: 12,
              borderRadius: 7,
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                fontSize: 15,
                textAlign: "center",
                marginBottom: 0,
                paddingBottom: 0,
              },
            ]}
          >
            We need your BVN to verify your Fullname , Phone number, Date of Birth.
          </Text>
          <Text
            style={[
              styles.label,
              {
                fontSize: 16,
                textAlign: "center",
                marginTop: 10,
                paddingTop: 0,
                fontWeight: "700",
              },
            ]}
          >
            Your BVN does not give us access to your bank account, transactions or any other Information.
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "49%", alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              dispatch(setBvnModal(false));
            }}
            style={[
              globalStyles.button,
              {
                fontFamily: "PoppinsBold",
                marginRight: 10,
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: "#e8e8e8",
              },
            ]}
          >
            <Text style={[globalStyles.buttonText, { fontFamily: "PoppinsBold", color: "#222" }]}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              dispatch(setAddbvnModal(true));
              dispatch(setBvnModal(false));
            }}
            style={[globalStyles.button, { fontFamily: "PoppinsBold" }]}
          >
            <Text style={[globalStyles.buttonText, { fontFamily: "PoppinsBold" }]}>Continue</Text>
          </TouchableOpacity>
        </View>
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
});

export default BvnForm;
