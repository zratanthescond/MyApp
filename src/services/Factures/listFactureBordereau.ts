import { instance } from "../instance";

export default async function getFactureByBordereau({
  contractId,
  newBordereauId,
}: {
  contractId: number;
  newBordereauId: number;
}) {
  //console.log("contractId", contractId);
  //console.log("individuId", newBordereauId);
  try {
    const response = await instance.get(
      `http://10.0.2.2:5000/api/Facture/${contractId}/${newBordereauId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
