import { Prorogation } from "@/types/type";
import { instance } from "../instance";

export default async function AddProrogation(data: Prorogation) {
  try {
    const res = await instance.post(
      `http://10.0.2.2:5000/api/Prorogation?contratId=${data.ContratId}&factureId=${data.FactureId}`,
      data
    );
    //console.log(res.data);
    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
}
