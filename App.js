import { useFonts } from "expo-font";
import { RootSiblingParent } from "react-native-root-siblings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MainApp from "./navigations";
import { useLayoutEffect, useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [bearerToken, setBearerToken] = useState(null);
  const [hasLoggedIn, setHasLoggedIn] = useState(null);
  const [loaded] = useFonts({
    // Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    // MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    Montserrat: require("./assets/fonts/Poppins-Regular.ttf"),
    MontserratBold: require("./assets/fonts/Poppins-Bold.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  useLayoutEffect(() => {
    (async () => {
      const appToken = await AsyncStorage.getItem("bearerToken");
      setBearerToken(appToken);
    })();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      const hasLoggedIn = await AsyncStorage.getItem("hasLoggedIn");
      setIsLoggedIn(false);
      setHasLoggedIn(hasLoggedIn);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  if (isLoggedIn) {
    return null;
  }

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <MainApp bearerToken={bearerToken} hasLoggedIn={hasLoggedIn} />
      </Provider>
    </RootSiblingParent>
  );
}
