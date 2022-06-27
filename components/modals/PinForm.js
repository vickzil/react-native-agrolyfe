import "../../../../ignoreWarnings";

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import colors from "../../../../styles/colors";
import { globalStyles } from "../../../../styles/global";
import CodeInput from "react-native-confirmation-code-input";

export class ChangePinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPin: "",
      newPin: "",
    };
    this.oldPinRef = React.createRef();
    this.newPinRef = React.createRef();
  }

  _onFulfill(value) {
    this.setState({ oldPin: value });
    console.log(this.state.oldPin);
  }

  _onFulfill2(value) {
    this.setState({ newPin: value });
    console.log(this.state.oldPin);
  }

  render() {
    return (
      <View style={styles.form}>
        <View style={{ marginBottom: 25, width: "100%" }}>
          <Text style={[styles.label, { textAlign: "center" }]}>Old Pin</Text>

          <CodeInput
            codeInputStyle={styles.inputContainer}
            ref={this.oldPinRef}
            // secureTextEntry
            containerStyle={styles.inputWrapper}
            keyboardType="numeric"
            codeLength={4}
            inputPosition="center"
            onFulfill={(code) => this._onFulfill(code)}
          />
        </View>
        <View style={{ marginTop: 25, width: "100%" }}>
          <Text style={[styles.label, { textAlign: "center" }]}>New Pin</Text>

          <CodeInput
            codeInputStyle={styles.inputContainer}
            ref={this.newPinRef}
            // secureTextEntry
            containerStyle={styles.inputWrapper}
            keyboardType="numeric"
            codeLength={4}
            inputPosition="center"
            onFulfill={(code) => this._onFulfill2(code)}
          />
        </View>

        <View style={{ marginTop: 70, width: "100%" }}>
          <TouchableOpacity activeOpacity={0.7} style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
    textTransform: "uppercase",
    fontWeight: "800",
  },

  inputWrapper: {
    justifyContent: "center",
  },

  inputContainer: {
    width: 62,
    height: 55,
    backgroundColor: "#fff",
    color: "#222",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.greenColor,
    alignItems: "center",
    borderRadius: 8,
    fontSize: 25,
  },
});

export default ChangePinForm;
