import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";

const AntiPhizingForm = () => {
  const [phrase, setPhrase] = useState("");

  return (
    <View style={styles.form}>
      <View
        style={{
          marginBottom: 40,
          width: "100%",
          borderWidth: 1,
          borderColor: "#ced4ce",
          paddingVertical: 14,
          paddingHorizontal: 10,
          borderRadius: 4,
        }}
      >
        <Text style={[styles.label, { fontWeight: "700", fontSize: 17 }]}>Why Anti-phishing?</Text>
        <Text style={[styles.label, { fontSize: 14 }]}>
          This is to prevent you from acting on unauthorized or fake E-mails that might be posing to be Agrovest.
        </Text>
      </View>
      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={styles.label}>phrase</Text>
        <View style={[styles.inputContainer]}>
          <TextInput
            value={phrase}
            onChangeText={(text) => setPhrase(text)}
            autoCorrect={false}
            placeholder="Enter phrase..."
            style={globalStyles.inputTextt}
          />
        </View>
      </View>

      <View style={{ marginTop: 20, width: "100%" }}>
        <TouchableOpacity activeOpacity={0.7} style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Update phrase</Text>
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

export default AntiPhizingForm;
