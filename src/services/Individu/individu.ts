import { instance } from "../instance";

export async function getIndividu(contractId: number): Promise<any> {
  //console.log("contractId", contractId);
  //console.log(contractId);
  try {
    const res = await instance.get(
      `/Individu/individusRoleIndividu/${contractId}`
    );
    //console.log(res.data);
    return res.data;
  } catch (error) {
    //console.log(error);
    return error.response.data;
  }
}
export async function getAcheteur(contractId: number): Promise<any> {
  //console.log("contractId", contractId);
  //console.log(contractId);
  try {
    const res = await instance.get(`Limite/acheteur/${contractId}`);
    //console.log(res.data);
    return res.data;
  } catch (error) {
    //console.log(error);
    return error.response.data;
  }
}
export async function addAcheteur(
  data: number[],
  contractId: number
): Promise<any> {
  try {
    const res = await instance.post(
      `Individu/${contractId}/ajouter-acheteurs`,
      data
    );
    //console.log(res.data);
    return res.data;
  } catch (error) {
    //console.log(error);
    return error.response.data;
  }
}

export async function updateIndividu(userData) {
  alert(JSON.stringify(userData));
  try {
    const res = await instance.put(
      `Individu/${userData.individuId}/profile`,
      userData
    );
    //console.log(res.data);
    return res.data;
  } catch (error) {
    //console.log(error);
    return error.response.data;
  }
}
