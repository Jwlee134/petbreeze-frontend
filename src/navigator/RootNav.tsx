import React, { useEffect } from "react";
import { useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

import CodePush from "react-native-code-push";
import BleManager from "react-native-ble-manager";
import * as SplashScreen from "expo-splash-screen";

const RootNav = () => {
  const isInitialized = useAppSelector(
    state => state.storage.initialization.isInitialized,
  );

  useEffect(() => {
    BleManager.start({ showAlert: false }).then(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  return isInitialized ? <LoggedInNav /> : <LoggedOutNav />;
};

export default CodePush(RootNav);
