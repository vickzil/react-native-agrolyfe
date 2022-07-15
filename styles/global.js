import { StyleSheet } from "react-native";
import colors from "./colors";
export const globalStyles = StyleSheet.create({
  siteTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  siteTitle: {
    fontFamily: "Poppins",
    // letterSpacing: -0.35644,
    fontWeight: "600",
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    textTransform: "uppercase",
  },

  label: {
    marginVertical: 5,
    fontSize: 15,
    color: "#444",
    marginBottom: 10,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  productContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 100,
  },

  inputContainer: {
    height: 55,
    // backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ced4ed",
    alignItems: "center",
    borderRadius: 8,
  },

  inputContainerDisabled: {
    backgroundColor: "#c8ccc7",
    color: "#888",
  },

  inputTextt: {
    color: "#333",
    flex: 1,
    fontSize: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },
  button: {
    height: 55,
    width: "100%",
    backgroundColor: "#14961E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  buttonFloat: {
    position: "absolute",
    width: "100%",
    right: 0,
    bottom: 0,
    paddingVertical: 5,
    paddingHorizontal: 30,
    // borderRadius: 80,
    // backgroundColor: "#fff",
    paddingBottom: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  accountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  accountImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
    padding: 4,
    backgroundColor: "#fff",
    position: "relative",
  },

  accountUserFullName: {
    fontFamily: "Poppins",
    marginTop: 14,
    fontSize: 16,
    color: "#666",
  },

  accountTitle: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
  },

  productCardContent: {
    width: "98%",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingBottom: 0,
  },

  selectContainer: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 2,
    marginTop: 3,
    elevation: 2,
  },

  selectContent: {
    width: "92%",
  },

  selectContentText: {
    fontFamily: "Poppins",
  },

  selectContentText1: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5,
    textTransform: "capitalize",
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  selectContentText2: {
    fontSize: 13,
    color: colors.greenColor,
    textTransform: "capitalize",
  },

  selectedItem: {
    width: "97%",
    borderWidth: 2,
    borderColor: "#e79b0e",
    marginLeft: 5,
  },

  resendPinContainer: {
    marginTop: 90,
  },

  resendPinButton: {
    backgroundColor: "#fff",
    color: "#222",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.greenColor,
  },

  resendPinFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
