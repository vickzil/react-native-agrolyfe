import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomInput = ({ lable, iconName, error, password, onFocus = () => {}, ...props }) => {
  const [IsFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{lable}</Text>

      <View
        style={[
          styles.inputContainer,
          // { borderColor: error ? "red" : IsFocused ? "#777" : "#ced4ed" },
          // IsFocused && styles.nprmalBackground,
        ]}
      >
        <Icon name={iconName} size={18} color="#666" style={{ marginRight: 16 }} />
        <TextInput
          secureTextEntry={hidePassword}
          // autoCorrect={false}
          // autoComplete={"off"}
          autoCapitalize="none"
          // onFocus={() => {
          //   onFocus();
          //   setIsFocused(true);
          // }}
          // onBlur={() => {
          //   setIsFocused(false);
          // }}
          style={{
            color: "#333",
            flex: 1,
            fontWeight: "500",
            fontFamily: "Poppins",
            letterSpacing: -0.35644,
            height: "100%",
            padding: 0,
            fontSize: 16,
          }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={{ fontSize: 20, color: "#666" }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          />
        )}
      </View>
      {error && <Text style={{ color: "red", fontSize: 13, marginTop: 7 }}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: "gray",
  },

  inputContainer: {
    height: 60,
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: "#ced4ed",
    alignItems: "center",
    borderRadius: 4,
  },

  nprmalBackground: {
    backgroundColor: "#f8f8f8",
  },
});
