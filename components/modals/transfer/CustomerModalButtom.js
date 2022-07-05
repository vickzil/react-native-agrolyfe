import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { setSelectedUser, setTransferToCustomerModal } from "../../../store/alert/alertSlice";
import { globalStyles } from "../../../styles/global";
import CustomLoadingButton from "../../customs/CustomLoadingButton";

const { width } = Dimensions.get("screen");

const CustomerModalButtom = ({ bottomSheet, closeModal }) => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [buttonText, setButtonText] = useState("Continue");
  const [emptyFields, setEmptyFields] = useState(true);
  const [loading, setLoading] = useState(false);

  const user = require("../../../assets/img/user-default.png");
  //   const modal = useSelector((state) => state.alert.transferModal);

  //   useEffect(() => {
  //     if (modal.status === true) {
  //       bottomSheet.current.show();
  //     }
  //     // else {
  //     //   bottomSheet.current.hide();
  //     // }
  //   }, [modal]);

  useEffect(() => {
    if (!userName) {
      setEmptyFields(true);

      return;
    }
    setEmptyFields(false);
  }, [userName]);

  const procceed = () => {
    setEmptyFields(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      let user = {
        firstName: "Victor Nwakwue",
        userName: userName,
      };

      dispatch(setSelectedUser(user));
      dispatch(
        setTransferToCustomerModal({
          status: true,
          user: user,
        }),
      );
      closeTransferModal();
    }, 1400);
  };

  const closeTransferModal = () => {
    setEmptyFields(true);
    setLoading(false);
    setButtonText("Continue");
    setUserName("");
    closeModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600} onRequestClose={() => closeTransferModal()}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.modalHeader]}>
            <Icon
              name="chevron-left"
              size={33}
              style={[styles.modalHeaderIcon, { color: "#111", padding: 2 }]}
              onPress={() => closeTransferModal()}
            />
            <Text style={styles.modalHeaderText}></Text>
            <Text></Text>
          </View>
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
              <Image
                source={user}
                style={[styles.accountImage, { width: "100%", height: "100%", borderRadius: 100 }]}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.accountUserFullName}>*********</Text>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}>
            <Text
              style={[globalStyles.label, { fontSize: 15, textAlign: "center", marginBottom: 40, fontWeight: "600" }]}
            >
              Enter customer username
            </Text>
            <View style={[styles.inputContainer]}>
              <TextInput
                value={userName}
                autoFocus={true}
                onChangeText={(text) => setUserName(text)}
                autoCorrect={false}
                style={[globalStyles.inputTextt, styles.inputField]}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
            marginBottom: 0,
            position: "absolute",
            bottom: 20,
            width: "100%",
          }}
        >
          <View style={{ width: "90%" }}>
            <CustomLoadingButton
              onPress={() => procceed()}
              emptyFields={emptyFields}
              buttonText={buttonText}
              loading={loading}
            />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,

    // elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
    color: "#111",
    marginLeft: -45,
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

export default CustomerModalButtom;
