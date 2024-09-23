import { instance } from "../instance";

export default async function createBorderau(data: any) {
  try {
    console.log(data);
    const res = await instance.post("http://10.0.2.2:5000/api/bordereau", data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
}
