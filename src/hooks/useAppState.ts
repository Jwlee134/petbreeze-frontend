import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

const useAppState = () => {
  const [appState, setAppState] = useState<AppStateStatus>();

  const handleAppStateChange = (status: AppStateStatus) => {
    setAppState(status);
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  return { appState };
};

export default useAppState;
