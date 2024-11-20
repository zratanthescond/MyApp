import { instance } from "../instance";

export default async function getFactureByAcheteur({
  contractId,
  newIndividuId,
}: {
  contractId: number;
  newIndividuId: number;
}) {
  //console.log("contractId", contractId);
  //console.log("individuId", newIndividuId);
  try {
    const response = await instance.get(
      `http://192.168.46.15:5000/api/Facture/GetFacturesByAcheteur/${contractId}/${newIndividuId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}


