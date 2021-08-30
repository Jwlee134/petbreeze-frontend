/**
 * @format
 */

import React from "react";
import { AppRegistry } from "react-native";
import App from "~/App";
import { name as appName } from "./app.json";

import messaging from "@react-native-firebase/messaging";
import { store } from "~/store";
import { storageActions } from "~/store/storage";
import { isAndroid } from "~/utils";
import iosBackgroundTracking from "~/utils/iosBackgroundTracking";
import androidBackgroundTracking from "~/utils/androidBackgroundTracking";

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background!", remoteMessage);

  if (!isAndroid) {
    await iosBackgroundTracking.init();
    await iosBackgroundTracking.start();
  } else {
    await androidBackgroundTracking.start();
  }
  store.dispatch(storageActions.setIsStopped(false));
  store.dispatch(storageActions.setIsWalking(true));
  store.dispatch(storageActions.setStartTime(new Date().toISOString()));

  /* Geolocation.getCurrentPosition(
    pos => {
      axios
        .post("http://172.30.1.5:3000/", {
          coords: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        })
        .then(() => {
          console.log("Http request succeeded!");
        });
    },
    err => {
      console.log(err);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }, 
  );*/
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
