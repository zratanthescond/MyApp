import ky from "ky";
import axios from "axios";
import { MMKV } from "react-native-mmkv";
const storage = new MMKV();
const prefixUrl = `${process.env.BACKEND_URL ? process.env.BACKEND_URL : ""}/`;
console.log(process.env.BACKEND_URL);
console.log(prefixUrl);
export const instance = axios.create({
  prefixUrl: prefixUrl,

  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
    Authorization: `Bearer ${storage?.getString("token")}`,
  },
});
