import "../../../../ignoreWarnings";
import { Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../../styles/colors";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serializeJSON } from "../../../helpers/globalFunction";
import { setAlertModal } from "../../../../store/alert/alertSlice";
import { getUserInfo } from "../../../../store/auth/actions";

const EditProfileHeaderImageTop = ({ handleLoading }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);

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
      // base64: true,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
      uploadProfileImage(result);
      // setIsLoading(true);
    }
    // if (!result.cancelled) {
    //   // setImage(result.uri);
    //   setUploadedImage(true);
    //   setImage("data:image/png;base64," + result.base64);
    //   console.log("data:image/png;base64," + result.base64);
    // }
  };

  const uploadProfileImage = (image) => {
    handleLoading(true);

    let fd = new FormData();

    fd.append("File", {
      uri: image?.uri,
      type: "image/jpg",
      name: "image-agrolyfe" + new Date() + ".jpg",
      size: 74715,
      webkitRelativePath: "",
      lastModified: Date.now(),
      lastModifiedDate: new Date(),
    });
    fd.append("AppId", AppId);
    fd.append("RequestId", RequestId);
    fd.append("UserCode", user?.code);
    fd.append("FileType", "profile_photos");

    axios
      .post(`${baseURL}/v1.0/User/fileUpload`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          handleLoading(false);

          dispatch(
            setAlertModal({
              status: true,
              type: "SUCCESS",
              title: "Profile Updated",
              des: response.data.message,
              payload: null,
            }),
          );

          dispatch(getUserInfo(user?.code));
        } else {
          handleLoading(false);

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
        handleLoading(false);

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
