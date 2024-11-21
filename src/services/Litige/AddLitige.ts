import { instance } from "../instance";
import { Litige, Prorogation } from "@/types/type";
export default async function AddLitige(data: Litige) {
  try {
    const res = await instance.post(
      `http://10.0.2.2:5000/api/Litige/${data.ContratId}/factures/${data.FactureId}/litiges`,
      data
    );
    //console.log(res.data);
    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
}
