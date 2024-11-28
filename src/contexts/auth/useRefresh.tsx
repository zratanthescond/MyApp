import { useContext } from "react";
import { RefreshContext } from "../RefreshContext";

type useRefreshType = {
  refresh: number;

  setRefresh: React.Dispatch<React.SetStateAction<number>>;
};
export default function useRefresh(): useRefreshType {
  const { refresh, setRefresh } = useContext<useRefreshType>(RefreshContext);
  return {
    refresh,
    setRefresh,
  };
}
