import { instance } from "../instance";

export default async function listeProrogation(factureId: number): Promise<any> {
    try {
        const res = await instance.get(`http://192.168.46.15:5000/api/Prorogation/facture/${factureId}`);
        //console.log(res);
        return res.data ? res.data : [];
    } catch (error) {
        //console.log(error.response.data);
    }
}