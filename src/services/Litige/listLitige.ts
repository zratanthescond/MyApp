import { instance } from "../instance";

export default async function listLitige(factureId: number): Promise<any> {
  try {
    const res = await instance.get(
      `/Litige/facture/${factureId}`
    );
    //console.log(res);
    return res.data ? res.data : [];
  } catch (error) {
    //console.log(error.response.data);
  }
}
