import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBankModal,
  setDefaultBank,
  setSelectCardModal,
  setSelectedCard,
  setFundWalletByCardModal,
} from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import NoItem from "../../extra/NoItem";

const { width } = Dimensions.get("screen");

const SelectCardModal = () => {
  const modal = useSelector((state) => state.alert.selectCardModal);
  const selectedCard = useSelector((state) => state.alert.selectedCard);
  const dispatch = useDispatch();
  const [allBanks] = useState([
    {
      id: 1,
      name: "Access bank",
      code: "8765437",
      accountNumber: "3567",
    },
    {
      id: 2,
      name: "Union bank",
      code: "8765437",
      accountNumber: "3567",
    },
  ]);

  const closeModal = () => {
    dispatch(
      setSelectCardModal({
        status: false,
        type: "",
      }),
    );
  };

  const selectCard = (item) => {
    closeModal();
    dispatch(setSelectedCard(item));
    if (modal.type === "Fund_WALLET_BY_CARD") {
      dispatch(
        setFundWalletByCardModal({
          status: true,
          card: item,
        }),
      );
    }
    // if (modal.type === "ADD_BANK") {
    //   setSelectedCard(item);
    // }
  };

  return (
    <Modal visible={modal?.status} animationType="fade" onRequestClose={() => closeModal()}>
      <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={{ marginTop: -40 }}>
        <View style={[styles.modalHeader, { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, { color: "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={styles.modalHeaderText}>Select Card</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            {allBanks && allBanks.length ? (
              <View>
                {allBanks?.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.container} onPress={() => selectCard(item)}>
                    <View style={styles.content} key={index}>
                      <Text style={[styles.contentText, styles.contentText1]}>{item.name}</Text>
                      <Text style={[styles.contentText, styles.contentText2]}>{item.accountNumber}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={{ marginTop: 50 }}>
                <NoItem
                  item={{ type: "BANK", buttonText: "Add Bank", message: "You haven't added any bank accounts" }}
                />
              </View>
            )}
          </View>
        </ScrollView>
        {/* <Banks /> */}
      </View>
    </Modal>
    // </GestureRecognizer>
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
    elevation: 3,
  },

  modalHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },

  modalHeaderText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Montserrat",
    color: "#222",
    marginLeft: -45,
  },

  modalSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 30,
  },

  container: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 2,
    elevation: 2,
  },

  content: {
    width: "95%",
  },

  contentText: {
    fontFamily: "Poppins",
  },

  contentText1: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 5,
  },

  contentText2: {
    fontSize: 14,
    color: colors.greenColor,
  },
});
export default SelectCardModal;
