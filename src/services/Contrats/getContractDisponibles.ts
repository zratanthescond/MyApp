import { instance } from "../instance";

export default async function getContractDisponibles(idContract: number) {
  console.log("idContract", idContract);

  const response = await instance.get(
    `http://10.0.2.2:5000/api/Disponible/ ${idContract}`
  );
  console.log(response);
  return response.data?.$values;
}
