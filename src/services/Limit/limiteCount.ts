import { instance } from "../instance";
export default async function GetAcheteursWithPendingLimitsByContratId(
  idContract: number
) {
  //console.log("idContract", idContract);

  const response = await instance.get(
    `http://10.0.2.2:5000/api/Limite/acheteur/ ${idContract}`
  );
  //console.log(response);
  return response.data?.$values;
}
