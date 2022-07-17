import React from "react";
import * as Animatable from "react-native-animatable";

const AnimatedView = ({ animation, style, children }) => {
  // const animations = ["fadeInLeft", "fadeInDown", "fadeInDownBig", "fadeInLeftBig", "fadeInRight", "fadeInRightBig"];

  // const animationIndex = Math.floor(Math.random() * 55);

  return (
    <Animatable.View style={style} animation={animation} easing="ease-out" duration={200} delay={200}>
      {children}
    </Animatable.View>
  );
};

export default AnimatedView;
