import React, { useEffect } from "react";
import { useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

import CodePush, { DownloadProgress } from "react-native-code-push";

import * as SplashScreen from "expo-splash-screen";
import FirmwareUpdate from "~/components/initialization/FirmwareUpdate";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { StatusBar, StatusBarStyle } from "react-native";

SplashScreen.preventAutoHideAsync();

const RootNav = () => {
  const isInitialized = useAppSelector(
    state => state.storage.initialization.isInitialized,
  );
  const isCodePushUpdated = useAppSelector(
    state => state.storage.initialization.isCodePushUpdated,
  );
  const dispatch = useDispatch();
  const [showFirmwareUpdate, setShowFirmwareUpdate] = useState(
    !isCodePushUpdated,
  );
  const [progress, setProgress] = useState(0);
  const [barStyle, setBarStyle] = useState<StatusBarStyle>("light-content");

  const handleStatus = (status: CodePush.SyncStatus) => {
    switch (status) {
      case CodePush.SyncStatus.UP_TO_DATE:
        dispatch(storageActions.setInitialization("codePush"));
        setShowFirmwareUpdate(false);
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        dispatch(storageActions.setInitialization("codePush"));
        setTimeout(() => {
          CodePush.restartApp();
        }, 300);
        break;
      default:
        break;
    }
  };

  const handleDownloadProgress = (progress: DownloadProgress) => {
    setProgress(
      Math.floor((progress.receivedBytes / progress.totalBytes) * 100),
    );
  };

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      setBarStyle("dark-content");
      if (!isCodePushUpdated) {
        CodePush.sync({}, handleStatus, handleDownloadProgress);
      } else {
        CodePush.sync();
      }
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar
        translucent
        barStyle={barStyle}
        backgroundColor="transparent"
      />
      {isInitialized ? (
        <LoggedInNav />
      ) : !showFirmwareUpdate ? (
        <LoggedOutNav />
      ) : (
        <FirmwareUpdate progress={progress} />
      )}
    </>
  );
};

export default RootNav;
