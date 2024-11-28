import { string } from "zod";
import { instance } from "../instance";
export default async function SendNumber(phoneNumber: String) {
  try {
    //console.log(phoneNumber + "number");
    const res = await instance.post(
      `http://10.0.2.2:5000/api/Auth/request-password-reset`,
      { phoneNumber: phoneNumber }
    );
    //console.log(res.data, 'hhhhh');
    return res.data;
  } catch (error) {
    //console.log(error);
    throw error;
  }
}
