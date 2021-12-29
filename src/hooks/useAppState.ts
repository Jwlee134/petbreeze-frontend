import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

const useAppState = () => {
  const [appState, setAppState] = useState<AppStateStatus>();

  const handleAppStateChange = (status: AppStateStatus) => {
    setAppState(status);
  };

  useEffect(() => {
    const listener = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      listener.remove();
    };
  }, []);

  return appState;
};

export default useAppState;
