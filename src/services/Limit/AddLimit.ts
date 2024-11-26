import { instance } from "../instance";
import { Limit } from "@/types/type";
export default async function AddLimit(data: Limit) {
  //console.log("==========================================================");
  try {
    const res = await instance.post(
      `/Limite/${data.contratId}`,
      data
    );
    //console.log(res.data);
    return res.data;
  } catch (error) {
    //console.log(error);
  }
}
