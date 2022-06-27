import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ChangePasswordForm = () => {
  const [oldPin1, setOldPin1] = useState("");
  const [oldPin2, setOldPin2] = useState("");
  const [oldPin3, setOldPin3] = useState("");
  const [oldPin4, setOldPin4] = useState("");

  const [newPin1, setNewPin1] = useState("");
  const [newPin2, setNewPin2] = useState("");
  const [newPin3, setNewPin3] = useState("");
  const [newPin4, setNewPin4] = useState("");

  const oldPin1Ref = useRef(null);
  const oldPin2Ref = useRef(null);
  const oldPin3Ref = useRef(null);
  const oldPin4Ref = useRef(null);

  const newPin1Ref = useRef(null);
  const newPin2Ref = useRef(null);
  const newPin3Ref = useRef(null);
  const newPin4Ref = useRef(null);

  return (
    <View style={styles.form}>
      <View style={{ marginBottom: 25, width: "100%" }}>
        <Text style={[styles.label, { textAlign: "center" }]}>Old Pin</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={[styles.inputContainer, { width: 62, marginRight: 10, borderWidth: 2 }]}>
            <TextInput
              keyboardType="numeric"
              secureTextEntry={true}
              ref={oldPin1Ref}
              value={oldPin1}
              onChangeText={(text) => {
                setOldPin1(text);
                if (oldPin1 != "") {
                  oldPin2Ref.current.focus();
                }
              }}
              maxLength={1}
              autoCorrect={false}
              style={[globalStyles.inputTextt, { textAlign: "center" }]}
            />
          </View>
          <View style={[styles.inputContainer, { width: 62, marginRight: 10, borderWidth: 2 }]}>
            <TextInput
              keyboardType="numeric"
              secureTextEntry={true}
              ref={oldPin2Ref}
              value={oldPin2}
              onChangeText={(text) => {
                setOldPin2(text);
                if (oldPin2 != "") {
                  oldPin3Ref.current.focus();
                }
              }}
              maxLength={1}
              autoCorrect={false}
              style={[globalStyles.inputTextt, { textAlign: "center" }]}
            />
          </View>
          <View style={[styles.inputContainer, { width: 62, marginRight: 10, borderWidth: 2 }]}>
            <TextInput
              keyboardType="numeric"
              secureTextEntry={true}
              ref={oldPin3Ref}
              value={oldPin3}
              onChangeText={(text) => {
                setOldPin3(text);
                if (oldPin3 != "") {
                  oldPin4Ref.current.focus();
                }
              }}
              maxLength={1}
              autoCorrect={false}
              style={[globalStyles.inputTextt, { textAlign: "center" }]}
            />
          </View>
          <View style={[styles.inputContainer, { width: 62, marginRight: 10, borderWidth: 2 }]}>
            <TextInput
              keyboardType="numeric"
              secureTextEntry={true}
              ref={oldPin4Ref}
              value={oldPin4}
              onChangeText={(text) => {
                setOldPin4(text);
                if (oldPin4Ref.current == "") {
                  oldPin3Ref.current.focus();
                }
              }}
              maxLength={1}
              autoCorrect={false}
              style={[globalStyles.inputTextt, { textAlign: "center" }]}
            />
          </View>
        </View>
      </View>

      <View style={{ marginTop: 20, width: "100%" }}>
        <TouchableOpacity activeOpacity={0.7} style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Submit</Text>
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
});

export default ChangePasswordForm;
