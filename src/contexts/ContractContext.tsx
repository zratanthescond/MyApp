import React, { useState } from "react";

export const ContractContext = React.createContext();

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const [contractId, setContractId] = useState<number>();

  return (
    <ContractContext.Provider value={{ contractId, setContractId }}>
      {children}
    </ContractContext.Provider>
  );
}
