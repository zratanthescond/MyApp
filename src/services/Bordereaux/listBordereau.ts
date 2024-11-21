import { instance } from "../instance";

export default async function listBordereau(contractId: number): Promise<any> {
  //console.log("contractId", contractId);
  try {
    const $values = [];
    const res = await instance.get(
      `http://10.0.2.2:5000/api/Bordereau/contrat/${contractId}`
    );
    //console.log(res);
    return res.data ? res.data : { $values: $values };
  } catch (error) {
    return { $values: [] }; // Return object with empty $values array on error
  }
}
