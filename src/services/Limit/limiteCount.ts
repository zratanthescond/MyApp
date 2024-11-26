import { instance } from "../instance";
export default async function GetAcheteursWithPendingLimitsByContratId(
  idContract: number
) {
  //console.log("idContract", idContract);

  const response = await instance.get(
    `/Limite/acheteur/ ${idContract}`
  );
  //console.log(response);
  return response.data?.$values;
}
