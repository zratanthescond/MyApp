import { instance } from "../instance";

export default async function getContractDisponibles(idContract: number) {
  //console.log("idContract", idContract);

  const response = await instance.get(
    `http://192.168.46.15:5000/api/Disponible/ ${idContract}`
  );
  //console.log(response);
  return response.data?.$values;
}
