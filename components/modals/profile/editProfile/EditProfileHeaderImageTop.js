import "../../../../ignoreWarnings";
import { Alert, Image, StyleSheet, Text, ToastAndroid, View, Permission } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../../styles/colors";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

const EditProfileHeaderImageTop = () => {
  const user = useSelector((state) => state.oauth.user);

  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(false);

  const userImage = require("../../../../assets/img/user-default.png");

  useEffect(() => {
    setImage(user?.photo);
  }, [user]);

  // const user = require("../../../../assets/img/user.jpg");

  const setToastMsg = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
      setUploadedImage(true);
      setImage("data:image/png;base64," + result.base64);
      console.log("data:image/png;base64," + result.base64);
    }
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 110,
          height: 110,
          borderRadius: 100,
          padding: 4,
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        {user ? (
          <Image
            source={{ uri: image }}
            style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
            resizeMode="cover"
          />
        ) : (
          <Image source={userImage} style={{ width: 46, height: 46, borderRadius: 50 }} resizeMode="cover" />
        )}

        <Ionicons
          name="camera"
          size={23}
          style={[styles.iconImageUpload, { color: "#fff" }]}
          onPress={() => pickImage()}
        />
      </View>
      <Text style={styles.accountUserFullName}>{user ? user.firstName + " " + user.lastName : "-----"}</Text>
      <Text style={styles.accountTitle}>{user ? user.code : "-----"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: "#fff",
  },

  accountTitle: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#fff",
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
});
export default EditProfileHeaderImageTop;
