import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "https://oxfordvestapi.azurewebsites.net/api";

const token = AsyncStorage.getItem("bearerToken");

let headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

if (token) {
  headers.Authorization = token || "";
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 403) {
      AsyncStorage.removeItem("token");
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;
