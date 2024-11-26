import { instance } from "../instance";

export default async function listLimit(contractId: number): Promise<any> {
  //console.log("contractId", contractId);
  try {
    const res = await instance.get(
      `/Limite/contrat/${contractId}`
    );
    //console.log(res);
    return res.data ? res.data : [];
  } catch (error) {
    //console.log(error.response.data);
  }
}
