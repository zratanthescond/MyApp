import { instance } from "../instance";

export async function getIndividu(contractId: number) {
  console.log("contractId", contractId);
  console.log(contractId);
  try {
    const res = await instance.get(
      `http://10.0.2.2:5000/api/Individu/individusRoleIndividu/${contractId}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
export async function getAcheteur(contractId: number) {
  console.log("contractId", contractId);
  console.log(contractId);
  try {
    const res = await instance.get(
      `http://10.0.2.2:5000/api/Individu/acheteurs/contrat/${contractId}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
