import axios from "axios";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const prefixUrl = `${
  process.env.BACKEND_URL ? process.env.BACKEND_URL : "http://10.0.2.2:5000/api"
}/`;
console.log(prefixUrl);
export const instance = axios.create({
  baseURL: prefixUrl,

  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
    Authorization: `Bearer ${storage?.getString("token") || ""}`,
  },
});
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
