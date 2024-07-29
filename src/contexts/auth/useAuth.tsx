import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function useAuth() {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  return { isLogged, setIsLogged };
}
