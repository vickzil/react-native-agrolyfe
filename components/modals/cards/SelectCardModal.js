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
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBankModal,
  setDefaultBank,
  setSelectCardModal,
  setSelectedCard,
  setFundWalletByCardModal,
  setAddCardModal,
} from "../../../store/alert/alertSlice";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import FocusAwareStatusBar from "../../customs/statusbar/FocusAwareStatusBar";
import NoItem from "../../extra/NoItem";
import { setSelectedSavingsType, setSelectedSavingsTypeDetails } from "../../../store/savings/savingsSlice";
import { globalStyles } from "../../../styles/global";
import AnimatedViewComp from "../../customs/AnimatedViewComp";

const { width } = Dimensions.get("screen");

const SelectCardModal = () => {
  const modal = useSelector((state) => state.alert.selectCardModal);
  const walletOptions = useSelector((state) => state.wallet.walletOptions);
  const selectedCard = useSelector((state) => state.alert.selectedCard);
  const theme = useSelector((state) => state.oauth.theme);
  const dispatch = useDispatch();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (walletOptions) {
      setCards(walletOptions?.bySavedCards);
    }
  }, [walletOptions]);

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

    if (modal.type === "MAKE_SAVINGS") {
      dispatch(setSelectedSavingsType("Card"));
      dispatch(setSelectedSavingsTypeDetails(item));
    }
    // if (modal.type === "ADD_BANK") {
    //   setSelectedCard(item);
    // }
  };

  return (
    <Modal
      visible={modal?.status}
      animationType="fade"
      onRequestClose={() => closeModal()}
      style={theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight}
    >
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkBody} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <View
        style={[
          { marginTop: -40, flex: 1 },
          theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
        ]}
      >
        <View style={[styles.modalHeader, theme === "dark" ? globalStyles.containerDark : { backgroundColor: "#fff" }]}>
          <Icon
            name="arrow-left"
            size={25}
            style={[styles.modalHeaderIcon, theme === "dark" ? globalStyles.textLight : { color: "#222" }]}
            onPress={() => closeModal()}
          />
          <Text style={[styles.modalHeaderText, theme === "dark" && globalStyles.textLight]}>Select Card</Text>
          <Text></Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productContainer]}>
            {cards && cards.length ? (
              <View>
                {cards?.map((item, index) => (
                  <AnimatedViewComp index={index} key={index}>
                    <TouchableOpacity
                      style={[styles.container, theme === "dark" && globalStyles.cardDark]}
                      onPress={() => selectCard(item)}
                    >
                      <View style={styles.content} key={index}>
                        <Text
                          style={[styles.contentText, styles.contentText1, theme === "dark" && globalStyles.textLight]}
                        >
                          {item?.cardBankName}
                        </Text>
                        <Text style={[styles.contentText, styles.contentText2]}>{item?.cardLast4}</Text>
                      </View>
                    </TouchableOpacity>
                  </AnimatedViewComp>
                ))}

                <View style={{ marginTop: 90, alignItems: "center", textAlign: "center" }}>
                  <View style={{ position: "relative", alignItems: "center" }}>
                    <Text style={{ position: "absolute", top: 10, backgroundColor: "#ced4ed", width: 300, height: 2 }}>
                      {" "}
                    </Text>
                    <Text
                      style={[
                        styles.contentText,
                        styles.contentText1,
                        { backgroundColor: "#fff", padding: 5, marginTop: -5 },
                        theme === "dark" && globalStyles.containerDark,
                        theme === "dark" && globalStyles.textLight,
                      ]}
                    >
                      OR
                    </Text>
                    <View style={{ marginTop: 30 }}>
                      <TouchableOpacity
                        style={[globalStyles.button, { paddingHorizontal: 50 }]}
                        onPress={() => dispatch(setAddCardModal(true))}
                      >
                        <Text
                          style={[
                            {
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: 17,
                              lineHeight: 29,
                              marginBottom: 0,
                              fontFamily: "Poppins",
                              color: "#fff",
                              textAlign: "center",
                            },
                          ]}
                        >
                          Add Another card
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{ marginTop: 50 }}>
                <NoItem item={{ type: "CARD", buttonText: "Add Card", message: "You haven't added any card yet" }} />
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
    // elevation: 3,
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
    width: "96%",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 2,
    elevation: 2,
    marginLeft: 9,
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
