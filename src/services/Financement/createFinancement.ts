import { instance } from "../instance";

export async function createFinancement({ data, individuId }) {
  try {
    const res = await instance.post(
      `http://10.0.2.2:5000/api/Financement/${individuId}/Financements`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
}
