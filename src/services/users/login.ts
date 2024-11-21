import { MMKV } from "react-native-mmkv";
import { instance } from "../instance";
import { Alert } from "react-native";

export default async function Login(data: any) {
  const storage = new MMKV();
  alert("Login");
  console.log(data);
  try {
    const response = await instance.post("Auth/login", data);
    console.log(response.data);
    storage.set("token", response.data.token);
    storage.set("user", JSON.stringify(response.data.user));
    storage.set("credentials", JSON.stringify(data));
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
