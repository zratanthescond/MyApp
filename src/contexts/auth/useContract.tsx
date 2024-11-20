import { useContext } from "react";
import { ContractContext } from "../ContractContext";

type useContractType = {
  contractId: number;
  contractMontant: number;
  referenceContrat: string;
  setContractMontant: React.Dispatch<React.SetStateAction<number>>;
  setContractId: React.Dispatch<React.SetStateAction<number>>;
  setContractReference: React.Dispatch<React.SetStateAction<string>>;
};
export default function useContract(): useContractType {
  const { contractId, setContractId, contractMontant, setContractMontant, referenceContrat, setContractReference } = useContext<useContractType>(ContractContext);
  return { contractId, setContractId, contractMontant, setContractMontant, referenceContrat, setContractReference };
}
