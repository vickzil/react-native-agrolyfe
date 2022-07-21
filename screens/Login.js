import "../ignoreWarnings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Keyboard, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../components/customs/CustomButton";
import CustomInput from "../components/customs/CustomInput";
import { validEmail } from "../components/helpers/globalFunction";
import Logo from "../components/logo/Logo";
import { setAlertModal, setLoading, setToastModal } from "../store/alert/alertSlice";
import {
  SaveLoginIdentity,
  saveUserInfo,
  setHasLogin,
  setShowBalances,
  setToken,
  setVerificationInfo,
} from "../store/auth/authSlice";
import colors from "../styles/colors";
import axios from "axios";
import { getTransactionsInfo } from "../store/transactions/actions";
import * as LocalAuthentication from "expo-local-authentication";
import SvgComponent from "../components/customs/SvgComponent";
import AnimatedView from "../components/customs/AnimatedView";
import { globalStyles } from "../styles/global";
import FocusAwareStatusBar from "../components/customs/statusbar/FocusAwareStatusBar";

const Login = ({ navigation }) => {
  const userImage = require("../assets/img/user-default.png");

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.oauth.theme);
  const loginIdentity = useSelector((state) => state.oauth.loginIdentity);
  const hasLogin = useSelector((state) => state.oauth.hasLogin);
  const baseURL = useSelector((state) => state.oauth.baseURL);
  const bearerToken = useSelector((state) => state.oauth.bearerToken);
  const AppId = useSelector((state) => state.oauth.AppId);
  const RequestId = useSelector((state) => state.oauth.RequestId);
  const [valid, setValid] = useState(true);
  const [isBiometricsSupported, setIsBiometricsSupported] = useState(false);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState(null);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (loginIdentity) {
      handleOnChange(loginIdentity?.email, "email");
    }
  }, [loginIdentity]);

  useEffect(() => {
    if (isBiometricsSupported) {
      // handleBiometricAuth();
      // console.log(isBiometricsSupported);
      // console.log(isBiometricsSupported);
    }
  }, [isBiometricsSupported]);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();

      setIsBiometricsSupported(compatible);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const storedUser = await AsyncStorage.getItem("loggedInUserDetails");
      let user = storedUser ? JSON.parse(storedUser) : null;

      setLoggedInUserDetails(user);
    })();
  }, []);

  const handleBiometricAuth = async () => {
    // check biomertic types avaliable
    let supportBiometrics;
    if (isBiometricsSupported) supportBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

    const hasSavedBioMetrices = await LocalAuthentication.isEnrolledAsync();
    if (!hasSavedBioMetrices) {
      return;
    }

    const storedUser = await AsyncStorage.getItem("loggedInUserDetails");
    let user = JSON.parse(storedUser);

    if (!user) {
      return;
    }

    setLoggedInUserDetails(user);

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login With Biometrics",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (biometricAuth && !biometricAuth.success) {
      dispatch(
        setToastModal({
          status: true,
          message: "Authentication unsuccessful",
        }),
      );
      setTimeout(() => {
        dispatch(
          setToastModal({
            status: false,
            message: "",
          }),
        );
      }, 2500);

      return;
    }

    if (biometricAuth && biometricAuth.success) {
      dispatch(
        setLoading({
          status: true,
          message: "please wait...",
        }),
      );

      getVerificationInfo(user.code);
      getUserInfos(user.code)
        .then((response) => {
          setUserDetails(response.data.data);
        })
        .catch(() => {
          setUserDetails(user);
        });

      // console.log(biometricAuth);

      // setTimeout(() => {
      //   setUserDetails(user);
      // }, 1000);
    }
  };

  const validate = () => {
    // setValid(true);

    if (!inputs.email) {
      handleError("Please input email", "email");
      setValid(false);
    }

    if (validEmail(inputs.email) == false) {
      handleError("Please input valid email", "email");
      setValid(false);
    }

    if (!inputs.password) {
      handleError("Please input password", "passworld");
      setValid(false);
    }

    if (inputs.email && inputs.password) {
      handleLogin();
    }

    Keyboard.dismiss();
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text.replace(/\s/g, "") }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const getUserInfos = async (userCode) => {
    const response = await axios.post(
      `${baseURL}/v1.0/Dashboard/getUserInfo`,
      {
        AppId: AppId,
        RequestId: RequestId,
        UserCode: userCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      },
    );

    return response;
  };

  const getVerificationInfo = (userCode) => {
    axios
      .post(
        `${baseURL}/v1.0/Dashboard/getVerificationInfo`,
        {
          AppId: AppId,
          RequestId: RequestId,
          UserCode: userCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + bearerToken,
          },
        },
      )
      .then((response) => {
        let data = response.data.data;

        // AsyncStorage.setItem("verificationInfo", JSON.stringify(data));

        // console.log(data);

        dispatch(setVerificationInfo(data));
      });
  };

  const handleLogin = () => {
    dispatch(
      setLoading({
        status: true,
        message: "Processing login, please wait...",
      }),
    );

    let payload = {
      AppId: AppId,
      RequestId: RequestId,
      Email: inputs.email,
      Password: inputs.password,
    };

    // console.log(payload);
    // console.log(bearerToken);

    axios
      .post(`${baseURL}/v1.0/OAuth/login`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        // console.log(response?.data);

        if (response?.data?.success == true) {
          setInputs({
            email: "",
            password: "",
          });
          // setInputs((prevState) => ({ ...prevState, email: ""}));
          // setInputs((prevState) => ({ ...prevState, password: "" }));

          if (response?.data?.data?.emailConfirmed) {
            const twoFactor = response.data.data.token.twoFactorToken;
            const data = response.data.data;
            // const token = response.data.data.token.token;
            // const expireTo = response.data.data.token.expireTo;

            if (twoFactor) {
              dispatch(
                setLoading({
                  status: false,
                  message: "",
                }),
              );

              AsyncStorage.setItem("userData", JSON.stringify(data));

              navigation.navigate("TwoFactor", {
                email: inputs.email,
              });
            } else {
              // console.log(data);
              AsyncStorage.setItem("loggedInUserDetails", JSON.stringify(data));
              setLoggedInUserDetails(data);
              getVerificationInfo(data.code);
              getUserInfos(data.code)
                .then((response) => {
                  setUserDetails(response.data.data);
                })
                .catch(() => {
                  setUserDetails(data);
                });
            }
          } else {
            navigation.navigate("InputCode");
            AsyncStorage.setItem("CONFIRMTYPE", "LOGIN");

            dispatch(
              setLoading({
                status: false,
                message: "",
              }),
            );

            dispatch(
              setAlertModal({
                status: true,
                type: "error",
                title: "Login Error",
                des: response.data.message,
                payload: null,
              }),
            );
          }
        } else {
          dispatch(
            setLoading({
              status: false,
              message: "",
            }),
          );

          dispatch(
            setAlertModal({
              status: true,
              type: "error",
              title: "Login Error",
              des: response.data.message,
              payload: null,
            }),
          );
        }
      })
      .catch(() => {
        dispatch(
          setLoading({
            status: false,
            message: "",
          }),
        );

        dispatch(
          setAlertModal({
            status: true,
            type: "error",
            title: "Service Error",
            des: "Service is temporarily unavailable. Please try again in a few minutes.",
            payload: null,
          }),
        );
      });
  };

  const setUserDetails = (data) => {
    AsyncStorage.setItem("user", JSON.stringify(data));
    AsyncStorage.setItem("token", data.token.token);
    AsyncStorage.setItem("appexrat", data.token.expireTo);
    AsyncStorage.setItem("hasLoggedIn", "yes");

    let userDetails = {
      fullName: data.firstName + " " + data.lastName,
      code: data.code,
      email: data.email,
      photo: data.photo,
    };

    AsyncStorage.setItem("loginIdentity", JSON.stringify(userDetails));

    dispatch(saveUserInfo(data));
    dispatch(setToken(data.token.token));
    dispatch(setHasLogin(true));
    dispatch(getTransactionsInfo(data?.code));
    dispatch(SaveLoginIdentity(userDetails));

    dispatch(
      setLoading({
        status: false,
        message: "",
      }),
    );
  };

  const logoutUserIdentity = () => {
    dispatch(
      setLoading({
        status: true,
        message: "please wait...",
      }),
    );

    setTimeout(() => {
      removeUserIdentity();
      dispatch(
        setLoading({
          status: false,
          message: "",
        }),
      );
    }, 1400);
  };

  const logoutUserIdentityForPassword = () => {
    dispatch(
      setLoading({
        status: true,
        message: "please wait...",
      }),
    );

    setTimeout(() => {
      navigation.navigate("ForgotPassword");
      removeUserIdentity();
      dispatch(
        setLoading({
          status: false,
          message: "",
        }),
      );
    }, 1400);
  };

  const removeUserIdentity = () => {
    AsyncStorage.removeItem("loginIdentity");
    AsyncStorage.removeItem("loggedInUserDetails");
    dispatch(SaveLoginIdentity(null));
    handleOnChange("", "email");
    handleOnChange("", "password");
    dispatch(setShowBalances(false));
    AsyncStorage.removeItem("showBalances");
  };

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#fff", flex: 1, fontFamily: "Poppins", position: "relative", width: "100%" },
        theme === "dark" ? globalStyles.containerDark : globalStyles.containerLight,
      ]}
    >
      <SvgComponent />

      {theme === "dark" ? (
        <FocusAwareStatusBar backgroundColor={colors.darkBody} barStyle="light-content" />
      ) : (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      )}

      <ScrollView
        contentContainerStyle={[
          { paddingHorizontal: 20, paddingTop: 0 },
          loginIdentity ? { paddingTop: 0 } : { paddingTop: 30 },
        ]}
      >
        <Logo />
        <AnimatedView
          animation={"zoomInUp"}
          style={[
            loginIdentity ? { paddingTop: 0 } : { paddingTop: 50 },
            { flex: 1, width: "100%", justifyContent: "flex-end" },
          ]}
        >
          <Text
            style={[
              {
                color: "black",
                fontSize: 22,
                fontWeight: "700",
                fontFamily: "Poppins",
                paddingTop: 0,
                letterSpacing: -0.35644,
                textAlign: "center",
                marginTop: -17,
              },
              theme === "dark" && globalStyles.textLight,
            ]}
          >
            {hasLogin ? "Welcome Back" : "Login"}
          </Text>
          <Text
            style={[
              { color: "gray", fontSize: 16, marginVertical: 2, textAlign: "center" },
              theme === "dark" && globalStyles.textLightLight,
            ]}
          >
            Please sign in to your account
          </Text>

          <View style={{ marginVertical: 20 }}>
            {loginIdentity ? (
              <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                <View style={{ width: 100, height: 100, borderRadius: 100, padding: 4, backgroundColor: "#fff" }}>
                  {loginIdentity?.photo ? (
                    <Image
                      source={{ uri: loginIdentity?.photo }}
                      style={{ width: "100%", height: "100%", borderRadius: 50 }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={userImage}
                      style={{ width: "100%", height: "100%", borderRadius: 50 }}
                      resizeMode="cover"
                    />
                  )}
                </View>
                <Text
                  style={[
                    {
                      fontFamily: "Poppins",
                      marginTop: 14,
                      fontSize: 16,
                      color: "#222",
                    },
                    theme === "dark" && globalStyles.textLight,
                  ]}
                >
                  {loginIdentity?.fullName}
                </Text>
              </View>
            ) : (
              <>
                <CustomInput
                  error={errors.email}
                  onChangeText={(text) => handleOnChange(text.replace(/\s/g, ""), "email")}
                  onFocus={() => {
                    handleError(null, "email");
                  }}
                  placeholder="Enter your email"
                  lable="Email"
                  iconName="email-outline"
                />

                <View>
                  <TouchableOpacity>
                    <Text
                      onPress={() => navigation.navigate("ForgotPassword")}
                      style={{
                        color: colors.greenColor,
                        textAlign: "right",
                        fontSize: 16,
                        fontWeight: "600",
                        marginTop: -7,
                        fontFamily: "Poppins",
                        letterSpacing: -0.35644,
                      }}
                    >
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            <CustomInput
              error={errors.password}
              onChangeText={(text) => handleOnChange(text.replace(/\s/g, ""), "password")}
              placeholder="Enter your password"
              lable="Password"
              onFocus={() => {
                handleError(null, "password");
              }}
              iconName="lock-outline"
              password={true}
            />
            {loginIdentity && (
              <Text
                onPress={() => logoutUserIdentityForPassword()}
                style={{
                  color: colors.greenColor,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                  // marginTop: -7,
                  fontFamily: "Poppins",
                  letterSpacing: -0.35644,
                }}
              >
                Forgot Password?
              </Text>
            )}

            <View style={{ marginTop: 40 }}>
              <CustomButton onPress={validate} valid={valid} title=" Login" />
            </View>

            {loginIdentity ? (
              <>
                <Text
                  onPress={() => logoutUserIdentity()}
                  style={{
                    color: colors.greenColor,
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "600",
                    marginTop: 20,
                    fontFamily: "Poppins",
                    letterSpacing: -0.35644,
                  }}
                >
                  Not {loginIdentity.fullName.split(" ")[0]} ? Switch account
                </Text>
                {isBiometricsSupported && loggedInUserDetails && (
                  <Icon
                    onPress={() => handleBiometricAuth()}
                    name={"fingerprint"}
                    size={48}
                    color="#666"
                    style={{ marginTop: 22, textAlign: "center" }}
                  />
                )}
              </>
            ) : (
              <Text
                onPress={() => navigation.navigate("Register")}
                style={{
                  color: colors.greenColor,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                  marginTop: 20,
                  fontFamily: "Poppins",
                  letterSpacing: -0.35644,
                }}
              >
                Don't have account? Register
              </Text>
            )}
          </View>
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
