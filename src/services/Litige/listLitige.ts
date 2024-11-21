import { instance } from "../instance";

export default async function listLitige(factureId: number): Promise<any> {
  try {
    const res = await instance.get(
      `http://10.0.2.2:5000/api/Litige/facture/${factureId}`
    );
    //console.log(res);
    return res.data ? res.data : [];
  } catch (error) {
    //console.log(error.response.data);
  }
}
