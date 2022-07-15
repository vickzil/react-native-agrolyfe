import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { globalStyles } from "../../styles/global";

const AnimatedViewComp = ({ index, children }) => {
  return (
    <Animatable.View
      animation={"fadeInLeft"}
      duration={100}
      delay={index * 100}
      //   style={globalStyles.selectContent}
      key={index}
    >
      {children}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({});

export default AnimatedViewComp;
