import { instance } from "../instance";
import { MMKV } from "react-native-mmkv";
export default async function Login(data: any) {
  const storage = new MMKV();
  //console.log(data);
  try {
    const response = await instance.post(
      "http://192.168.46.15:5000/api/Auth/login",
      data
    );
    //console.log(response.data);
    storage.set("token", response.data.token);
    storage.set("user", JSON.stringify(response.data.user));
    storage.set("credentials", JSON.stringify(data));
    return response.data;
  } catch (error) {
    //console.log(error);
    throw new Error;
  }
}
