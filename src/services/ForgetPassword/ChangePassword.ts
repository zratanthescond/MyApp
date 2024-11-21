import { instance } from "../instance";
type ChangePasswordType = {
  code: string;
  newPassword: string;
  phoneNumber: string;
};
export default async function ChangePassword(data: ChangePasswordType) {
  try {
    //console.log(data);
    const res = await instance.post(
      `http://10.0.2.2:5000/api/Auth/reset-password`,
      data
    );
    return res.data;
  } catch (error) {
    //console.log(error);
    throw error;
  }
}
