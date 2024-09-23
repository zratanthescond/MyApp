import { useContext } from "react";
import { AuthContext } from "./AuthContext";
type useAuthType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function useAuth(): useAuthType {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  return { isLogged, setIsLogged };
}
