import { instance } from "../instance";
export default async function getMycontract() {
  const response = await instance.get(
    "http://192.168.46.15:5000/api/Contrat/adherents/contrats"
  );
  return response.data?.$values;
}
