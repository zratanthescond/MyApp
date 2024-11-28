import { instance } from "../instance";

export default async function listFinancement(
  contractId: number
): Promise<any> {
  //console.log("contractId", contractId);
  try {
    const res = await instance.get(
      `http://10.0.2.2:5000/api/Financement/contrat/${contractId}`
    );
    //console.log(res);
    return res.data ? res.data : [];
  } catch (error) {
    //console.log(error.response.data);
  }
}
