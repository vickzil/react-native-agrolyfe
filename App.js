import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import AppStack from "./navigations/AppStack";
import AuthStack from "./navigations/AuthStack";

import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState();

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData?.loggedIn) {
          setInitialRouteName("Home");
        } else {
          setInitialRouteName("Login");
        }
      } else {
        setInitialRouteName("Welcome");
      }
    } catch (error) {
      setInitialRouteName("Welcome");
    }
  };

  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    // <NavigationContainer>
    //   {initialRouteName && (
    //     <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
    //       <Stack.Screen name="Welcome" component={Welcome} />
    //       <Stack.Screen name="Login" component={Login} />
    //       <Stack.Screen name="Register" component={Register} />
    //       <Stack.Screen name="Home" component={Home} />
    //     </Stack.Navigator>
    //   )}
    // </NavigationContainer>
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
        {/* <AuthStack /> */}
      </NavigationContainer>
    </Provider>
  );
}
