import { instance } from "../instance";

export async function createFinancement({ data, individuId }) {
  try {
    const res = await instance.post(
      `/Financement/${individuId}/Financements`,
      data
    );
    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
}
