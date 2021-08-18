import React, { useEffect } from "react";
import { store, useAppSelector } from "~/store";
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
import BLEAdvertiser from "react-native-ble-advertiser";

import Geolocation from "react-native-geolocation-service";
import BackgroundService from "react-native-background-actions";

SplashScreen.preventAutoHideAsync();

/* const options = {
  taskName: "Example",
  taskTitle: "어디개",
  taskDesc: "산책 중입니다...",
  taskIcon: {
    name: "ic_launcher",
    type: "mipmap",
  },
  color: "#ff00ff",
  linkingURI: "petbreeze://walk/map",
};

const setCoords = () => {
  return new Promise<number>((resolve, reject) => {
    const id = Geolocation.watchPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        console.log(latitude, longitude);
        store.dispatch(
          storageActions.setCoords({
            latitude: Number(latitude.toFixed(6)),
            longitude: Number(longitude.toFixed(6)),
          }),
        );
        resolve(id);
      },
      error => {
        console.log("Geolocation error: ", error);
        reject();
      },
      {
        enableHighAccuracy: false,
        distanceFilter: 10,
      },
    );
  });
};

const stopwatch = async () => {
  for (
    let i = store.getState().storage.walk.duration;
    BackgroundService.isRunning();
    i++
  ) {
    store.dispatch(storageActions.setDuration(i));
    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
};

const backgroundTask = async () => {
  await new Promise<void>(() => {
    setCoords()
      .then(trackingId => {
        store.dispatch(storageActions.setStartTime(new Date().toISOString()));
        store.dispatch(storageActions.setTrackingId(trackingId));
        stopwatch();
      })
      .catch(() => {
        store.dispatch(storageActions.setIsWalking(false));
        BackgroundService.stop();
      });
  });
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background!");
  BLEAdvertiser.setCompanyId(0x02); // Your Company's Code
  BLEAdvertiser.broadcast(
    "e7111937-f9c1-4fb6-b6ee-ae9f255a7f46",
    [255, 255, 255, 255],
    {
      txPowerLevel: BLEAdvertiser.ADVERTISE_TX_POWER_HIGH,
    },
  ) // The service UUID and additional manufacturer data.
    .then(success => {
      console.log("Broadcasting Sucessful", success);
      store.dispatch(storageActions.setIsStopped(false));
      if (
        !BackgroundService.isRunning() &&
        store.getState().storage.walk.didMountInitially
      ) {
        BackgroundService.start(backgroundTask, options).then(() => {
          store.dispatch(storageActions.setDidMountInitially(false));
          store.dispatch(storageActions.setIsWalking(true));
        });
      }
    })
    .catch(error => console.log("Broadcasting Error", error));
}); */

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
