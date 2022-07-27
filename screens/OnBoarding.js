import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import colors from "../styles/colors";
import { useSelector } from "react-redux";
import { globalStyles } from "../styles/global";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";
import SvgComponent from "../components/customs/SvgComponent";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Own And Rent",
    desc: "You can own acres of farmlands which will be leased out to farmers for a year",
    image: require("../assets/img/agrolyfe1.jpg"),
  },
  {
    id: 2,
    title: "Earn More Income",
    desc: "Subscribe to Agrolyfe and earn rental income from Farmlands every month or 3 months",
    image: require("../assets/img/agrolyfe2.jpg"),
  },
  {
    id: 3,
    title: "Plan For The Future",
    desc: "A platform that gives you access to consistence income and the opportunity to grow wealth ",
    image: require("../assets/img/agrolyfe3.jpg"),
  },
];

const OnBoarding = ({ navigation }) => {
  const theme = useSelector((state) => state.oauth.theme);

  const buttonLabel = (label) => {
    return (
      <View style={{ padding: 12 }}>
        <Text style={[{ color: "#222", fontWeight: "600", fontSize: 16 }, theme === "dark" && globalStyles.textLight]}>
          {label}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#fff", flex: 1, fontFamily: "Poppins" },
        theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
      ]}
    >
      <SvgComponent />
      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkBody} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <View style={[{ marginTop: 10, alignItems: "center" }]}>
        <Image source={require("../assets/img/logo.png")} style={{ width: 150, height: 150 }} resizeMode="contain" />
      </View>
      <AppIntroSlider
        renderItem={({ item }) => {
          return (
            <View style={[{ flex: 1, alignItems: "center", padding: 15, paddingTop: 30 }]}>
              <Image
                source={item.image}
                style={{
                  width: width - 50,
                  height: 300,
                  // borderRadius: 1,
                }}
                resizeMode="contain"
              />
              <Text
                style={[
                  {
                    fontWeight: "600",
                    fontSize: 22,
                    textTransform: "uppercase",
                    fontFamily: "PoppinsBold",
                    textAlign: "center",
                    color: colors.greenColor,
                  },
                  theme === "dark" && globalStyles.textLight,
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  {
                    fontWeight: "600",
                    fontSize: 17,
                    fontFamily: "Poppins",
                    textAlign: "center",
                  },
                  theme === "dark" && globalStyles.textLight,
                ]}
              >
                {item.desc}
              </Text>
            </View>
          );
        }}
        data={slides}
        activeDotStyle={{
          backgroundColor: colors.greenColor,
          width: 30,
        }}
        dotStyle={{
          backgroundColor: theme === "dark" ? "#fff" : "#666",
        }}
        showSkipButton
        renderNextButton={() => buttonLabel("Next")}
        renderSkipButton={() => buttonLabel("Skip")}
        renderDoneButton={() => buttonLabel("Done")}
        onDone={() => navigation.navigate("Login")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default OnBoarding;
