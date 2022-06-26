import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ChangePasswordForm = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);

  return (
    <View style={styles.form}>
      <View style={{ marginBottom: 25, width: "100%" }}>
        <Text style={styles.label}>Old password</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            placeholder="Enter old password"
            style={globalStyles.inputTextt}
          />
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={{ fontSize: 22, color: "#666" }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>New password</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            secureTextEntry={hideNewPassword}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            autoCorrect={false}
            placeholder="Enter new password"
            style={globalStyles.inputTextt}
          />
          <Icon
            onPress={() => setHideNewPassword(!hideNewPassword)}
            style={{ fontSize: 22, color: "#666" }}
            name={hideNewPassword ? "eye-outline" : "eye-off-outline"}
          />
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
