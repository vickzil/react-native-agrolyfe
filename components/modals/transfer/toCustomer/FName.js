import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { globalStyles } from "../../../../styles/global";
import colors from "../../../../styles/colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useDispatch } from "react-redux";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const userImage = require("../../../../assets/img/user-default.png");

const FName = ({ userName, setUserName, calculatedUser, setCalculatedUser, removeUser }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: screenWidth, paddingBottom: 0 }}>
      <View style={[styles.productContainer, { paddingBottom: 0 }]}>
        <View style={{ marginTop: 60, marginBottom: 10, width: "95%", paddingRight: 10 }}>
          <View>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                  padding: 4,
                  backgroundColor: "#fff",
                  position: "relative",
                }}
              >
                {calculatedUser ? (
                  <Image
                    source={{ uri: calculatedUser?.photo }}
                    style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={userImage}
                    style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
                    resizeMode="cover"
                  />
                )}
              </View>

              {calculatedUser ? (
                <>
                  <Text style={[styles.accountUserFullName, { fontSize: 20, marginBottom: 0, paddingBottom: 0 }]}>
                    {calculatedUser?.firstName + " " + calculatedUser.lastName}
                  </Text>
                  <Text style={[styles.accountUserFullName, { marginTop: 0, fontWeight: "900" }]}>
                    @{calculatedUser?.userName}
                  </Text>

                  <View style={[globalStyles.resendPinContainer, { marginTop: 50 }]}>
                    <TouchableOpacity
                      style={globalStyles.resendPinButton}
                      activeOpacity={0.3}
                      onPress={() => removeUser()}
                    >
                      <View style={globalStyles.resendPinFlex}>
                        <EvilIcons name="close" size={21} style={[{ color: "#111", padding: 2, marginRight: 6 }]} />

                        <Text>Cancel</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <Text style={styles.accountUserFullName}>*********</Text>
              )}
            </View>

            {!calculatedUser ? (
              <View style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}>
                <Text
                  style={[
                    globalStyles.label,
                    { fontSize: 15, textAlign: "center", marginBottom: 40, fontWeight: "600" },
                  ]}
                >
                  Enter customer username
                </Text>
                <View style={[styles.inputContainer]}>
                  <Text style={{ fontWeight: "900", fontSize: 20, marginRight: 4 }}>@</Text>
                  <TextInput
                    value={userName}
                    autoFocus={true}
                    autoCapitalize="none"
                    selectionColor="#f8f8f8"
                    onChangeText={(text) => setUserName(text.replace(/\s/g, ""))}
                    autoCorrect={false}
                    style={[
                      globalStyles.inputTextt,
                      styles.inputField,
                      { width: "100%", paddingBottom: 0, fontSize: 20, fontWeight: "700" },
                    ]}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FName;

const styles = StyleSheet.create({
  productContainer: {
    width: screenWidth,
    height: "100%",
    flex: 1,
    alignItems: "center",
  },

  productCardContentItem: {
    flexDirection: "row",
    paddingBottom: 25,
    paddingTop: 26,
    marginBottom: 26,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },

  productCardContentItemLeft: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginRight: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  productCardContentItemRight: {
    fontSize: 16,
    color: "#444",
    fontWeight: "600",
    justifyContent: "flex-end",
    fontFamily: "Montserrat",
  },

  headerImageContainer: {
    paddingBottom: 40,
  },

  accountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  accountUserFullName: {
    fontFamily: "Poppins",
    marginTop: 14,
    fontSize: 17,
    color: "#666",
  },

  accountTitle: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#222",
    fontWeight: "700",
  },

  iconImageUpload: {
    position: "absolute",
    bottom: 5,
    right: -5,
    backgroundColor: "#18856F",
    borderRadius: 50,
    padding: 8,
    fontWeight: "700",
  },

  inputContainer: {
    width: "80%",
    height: 55,
    // backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderColor: colors.greenColor,
    alignItems: "center",
    borderRadius: 8,
  },
});
