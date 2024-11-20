import React, { useState } from "react";

export const ContractContext = React.createContext();

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const [contractId, setContractId] = useState<number>();
  const [contractMontant, setContractMontant] = useState<number>();
  const [referenceContrat, setContractReference] = useState<string>();
  return (
    <ContractContext.Provider value={{ contractId, setContractId, contractMontant, setContractMontant, referenceContrat, setContractReference }}>
      {children}
    </ContractContext.Provider>
  );
}
