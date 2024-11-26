import { instance } from "../instance";

export default async function getContractDisponibles(idContract: number) {
  //console.log("idContract", idContract);

  const response = await instance.get(
    `/Disponible/ ${idContract}`
  );
  //console.log(response);
  return response.data?.$values;
}
