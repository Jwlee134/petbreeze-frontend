import BackgroundGeolocation from "react-native-background-geolocation";
import { store } from "~/store";
import { storageActions } from "~/store/storage";
import { getDistanceBetween2Points } from ".";

const addListeners = () => {
  BackgroundGeolocation.onLocation(
    ({ coords: { latitude, longitude } }) => {
      console.log(latitude, longitude);
      store.dispatch(
        storageActions.setCoords({
          latitude: Number(latitude.toFixed(6)),
          longitude: Number(longitude.toFixed(6)),
        }),
      );

      const coords = store.getState().storage.walk.coords;
      if (coords.length > 1) {
        const distanceBetweenCoords = getDistanceBetween2Points(
          coords[coords.length - 1][0],
          coords[coords.length - 1][1],
          coords[coords.length - 2][0],
          coords[coords.length - 2][1],
        );
        if (distanceBetweenCoords < 10) {
          console.log("splice");
          store.dispatch(storageActions.spliceCoords());
        } else {
          console.log("setMeter");
          store.dispatch(
            storageActions.setMeter(Math.round(distanceBetweenCoords)),
          );
        }
      }
    },
    error => {
      console.log("[location] ERROR -", error);
    },
  );
  BackgroundGeolocation.onActivityChange(event => {
    console.log("[activitychange] -", event); // eg: 'on_foot', 'still', 'in_vehicle'
  });
  BackgroundGeolocation.onProviderChange(provider => {
    console.log("[providerchange] -", provider.enabled, provider.status);
  });
  BackgroundGeolocation.onMotionChange(event => {
    console.log("[motionchange] -", event.isMoving, event.location);
  });
};

export default {
  init: () =>
    BackgroundGeolocation.ready({
      showsBackgroundLocationIndicator: true,
      stopOnTerminate: false,
      preventSuspend: true,
      stopTimeout: 10,
    }).then(() => {
      console.log(
        "[ready] BackgroundGeolocation is configured and ready to use",
      );
    }),
  start: () =>
    BackgroundGeolocation.start().then(() => {
      addListeners();
      BackgroundGeolocation.changePace(true);
    }),
  stop: () =>
    BackgroundGeolocation.stop().then(() => {
      BackgroundGeolocation.removeListeners();
    }),
  isRunning: () =>
    BackgroundGeolocation.getState().then(state => state.enabled),
};
