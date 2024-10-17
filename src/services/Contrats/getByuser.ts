import { instance } from "../instance";
export default async function getMycontract() {
  const response = await instance.get(
    "http://192.168.100.178:5000/api/Contrat/adherents/contrats"
  );
  // console.log(response.data.$values);
  return response.data?.$values;
}
