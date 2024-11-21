import { instance } from "../instance";
export default async function getMycontract() {
  const response = await instance.get("Contrat/adherents/contrats");
  return response.data?.$values;
}
