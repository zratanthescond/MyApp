import { instance } from "../instance";

export default async function listeProrogation(
  factureId: number
): Promise<any> {
  try {
    const res = await instance.get(
      `/Prorogation/facture/${factureId}`
    );
    //console.log(res);
    return res.data ? res.data : [];
  } catch (error) {
    //console.log(error.response.data);
  }
}
