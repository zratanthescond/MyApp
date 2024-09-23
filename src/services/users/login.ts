import { instance } from "../instance";
import { MMKV } from "react-native-mmkv";
export default async function Login(data: any) {
  const storage = new MMKV();
  console.log(data);
  try {
    const response = await instance.post(
      "http://10.0.2.2:5000/api/Auth/login",
      data
    );
    console.log(response.data);
    storage.set("token", response.data.token);
    storage.set("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
