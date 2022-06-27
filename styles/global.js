import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  siteTitle: {
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
    fontWeight: "800",
    fontSize: 13,
    color: "#555",
    marginBottom: 5,
    textTransform: "uppercase",
  },

  label: {
    marginVertical: 5,
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
    fontFamily: "Poppins",
    letterSpacing: -0.35644,
  },

  inputTextt: {
    color: "#333",
    flex: 1,
    fontSize: 17,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
});
