import * as React from "react";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import GeneralStatusBarColor from "./GeneralStatusBarColor";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <GeneralStatusBarColor {...props} /> : null;
}

export default FocusAwareStatusBar;
