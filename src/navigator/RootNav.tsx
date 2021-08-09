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
import { StatusBar, StatusBarStyle } from "react-native";

import Blemanager from "react-native-ble-manager";
import messaging from "@react-native-firebase/messaging";

SplashScreen.preventAutoHideAsync();

const RootNav = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage,
          );
        }
      });

    return unsubscribe;
  }, []);

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
  const [barStyle, setBarStyle] = useState<StatusBarStyle>("light-content");

  const handleStatus = (status: CodePush.SyncStatus) => {
    switch (status) {
      case CodePush.SyncStatus.UP_TO_DATE:
        setProgress(100);
        dispatch(storageActions.setInit("codePush"));
        setTimeout(() => {
          setShowFirmwareUpdate(false);
        }, 300);
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        dispatch(storageActions.setInit("codePush"));
        setTimeout(() => {
          setBarStyle("light-content");
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
    }, 500);
  }, []);

  useEffect(() => {
    if (isPermissonAllowed)
      Blemanager.start({ showAlert: false }).then(() => {
        console.log("BLE Module is initialized.");
      });
  }, [isPermissonAllowed]);

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
