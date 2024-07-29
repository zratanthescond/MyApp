import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";

import { ThemeProvider } from "@/theme";

import ApplicationNavigator from "./navigators/Application";
import "./translations";
import React from "react";
import { AuthProvider } from "./contexts/auth/AuthContext";

const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storage={storage}>
        <AuthProvider>
          <ApplicationNavigator />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
