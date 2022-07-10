import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MarqueeText from "react-native-marquee";
import colors from "../../styles/colors";
import { useSelector } from "react-redux";

const MarqueeTextSample = () => {
  const dashboardMessage = useSelector((state) => state.oauth.dashboardMessage);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (dashboardMessage) {
      let date1 = new Date(dashboardMessage?.createdOn);
      let date2 = new Date();
      let isGreater = +date2 > date1.setDate(date1.getDate() + 3);
      setIsEnabled(isGreater);
    }
  }, [dashboardMessage]);

  return (
    !isEnabled &&
    dashboardMessage?.status === "active" && (
      <View style={styles.container}>
        <Text style={styles.whiteFloot}>Info</Text>
        <MarqueeText style={[styles.MarqueeText]} speed={0.2} marqueeOnStart={true} loop={true} delay={1000}>
          {dashboardMessage?.message}
        </MarqueeText>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 40,
    backgroundColor: "#fff",
    borderRadius: 0,
    position: "relative",
    width: "100%",
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    paddingRight: 5,
  },

  whiteFloot: {
    position: "absolute",
    top: 0,
    width: 60,
    height: "100%",
    lineHeight: 50,
    backgroundColor: colors.greenProductColor,
    color: "#fff",
    zIndex: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    textAlign: "center",
    alignItems: "center",
    fontWeight: "800",
    textTransform: "uppercase",
  },

  MarqueeText: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingLeft: 78,
    // paddingRight: 200,
    // marginRight: 30,
    color: "#111",
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
});
export default MarqueeTextSample;
