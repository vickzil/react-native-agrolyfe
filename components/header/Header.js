import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, icons }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
    console.log(navigation);
  };

  return (
    <View style={styles.pageHeader}>
      {icons && (
        <Icon
          name="arrow-left"
          size={20}
          style={[styles.pageHeaderIcon, { color: colors.greenColor }]}
          onPress={() => goBack()}
        />
      )}

      <Text style={[styles.pageHeaderTitle, { color: colors.greenColor }]}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  pageHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  pageHeaderTitle: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 0,
    fontFamily: "Poppins",
  },

  pageHeaderIcon: {
    fontWeight: "900",
    marginRight: 10,
  },
});
