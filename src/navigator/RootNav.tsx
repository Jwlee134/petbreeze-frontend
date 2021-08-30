import React, { useEffect } from "react";
import { useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

import CodePush, { DownloadProgress } from "react-native-code-push";

import * as SplashScreen from "expo-splash-screen";
import FirmwareUpdate from "~/components/init/FirmwareUpdate";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { StatusBar } from "react-native";

import Blemanager from "react-native-ble-manager";

const RootNav = () => {
  const isInitialized = useAppSelector(
    state => state.storage.init.isInitialized,
  );
  const isPermissonAllowed = useAppSelector(
    state => state.storage.init.isPermissionAllowed,
  );
  const isCodePushUpdated = useAppSelector(
    state => state.storage.init.isCodePushUpdated,
  );
  const dispatch = useDispatch();
  const [showFirmwareUpdate, setShowFirmwareUpdate] = useState(
    !isCodePushUpdated,
  );
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const handleStatus = (status: CodePush.SyncStatus) => {
    switch (status) {
      case CodePush.SyncStatus.UP_TO_DATE:
        setProgress(100);
        dispatch(storageActions.setInit("codePush"));
        setTimeout(() => {
          setShowFirmwareUpdate(false);
        }, 500);
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        dispatch(storageActions.setInit("codePush"));
        setTimeout(() => {
          CodePush.restartApp();
        }, 500);
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
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setIsReady(true);
        if (!isCodePushUpdated) {
          CodePush.sync({}, handleStatus, handleDownloadProgress);
        } else {
          CodePush.sync();
        }
      }, 500);
    };
    prepare();
  }, []);

  useEffect(() => {
    if (isPermissonAllowed)
      Blemanager.start({ showAlert: false }).then(() => {
        console.log("BLE Module is initialized.");
      });
  }, [isPermissonAllowed]);

  if (!isReady) return null;

  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
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
