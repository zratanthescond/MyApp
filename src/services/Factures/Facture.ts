import { instance } from "../instance";

export default async function getFactureByAcheteur({
  contractId,
  individuId,
}: {
  contractId: number;
  individuId: number;
}) {
  console.log("contractId", contractId);
  console.log("individuId", individuId);
  try {
    const response = await instance.get(
      `http://192.168.100.178:5000/api/Facture/GetFacturesByAcheteur/${contractId}/${individuId}`
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
}
