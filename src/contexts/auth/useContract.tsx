import { useContext } from "react";
import { ContractContext } from "../ContractContext";

type useContractType = {
  contractId: number;
  setContractId: React.Dispatch<React.SetStateAction<number>>;
};
export default function useContract(): useContractType {
  const { contractId, setContractId } = useContext(ContractContext);
  return { contractId, setContractId };
}
