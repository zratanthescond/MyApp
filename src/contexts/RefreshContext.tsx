import React, { useState, useMemo } from "react";

export const RefreshContext = React.createContext();

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const [refresh, setRefresh] = useState<number>(0);
  const value = useMemo(() => ({ refresh, setRefresh }), [refresh, setRefresh]);
  return (
    <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>
  );
}
