import React from "react";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";

import { ThemeProvider } from "@/theme";

import ApplicationNavigator from "./navigators/Application";
import "./translations";

import { AuthProvider } from "./contexts/auth/AuthContext";
import { ContractProvider } from "./contexts/ContractContext";
import { RefreshProvider } from "./contexts/RefreshContext";

const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
  return (
    <RefreshProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <AuthProvider>
            <ContractProvider>
              <ApplicationNavigator />
            </ContractProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </RefreshProvider>
  );
}

export default App;
