import BackgroundService from "react-native-background-actions";
import Geolocation from "react-native-geolocation-service";
import { store } from "~/store";
import { storageActions } from "~/store/storage";
import { getDistanceBetween2Points } from ".";

const options = {
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

const setCoords = () =>
  new Promise<number>((resolve, reject) => {
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

        const coords = store.getState().storage.walk.coords;
        if (coords.length > 1) {
          const distanceBetweenCoords = getDistanceBetween2Points(
            coords[coords.length - 1][0],
            coords[coords.length - 1][1],
            coords[coords.length - 2][0],
            coords[coords.length - 2][1],
          );
          if (distanceBetweenCoords < 10) {
            store.dispatch(storageActions.spliceCoords());
          } else {
            store.dispatch(
              storageActions.setMeter(Math.round(distanceBetweenCoords)),
            );
          }
        }

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

const backgroundTask = async () => {
  await new Promise<void>(() => {
    setCoords()
      .then(trackingId => {
        store.dispatch(storageActions.setTrackingId(trackingId));
      })
      .catch(() => {
        store.dispatch(storageActions.setIsWalking(false));
        BackgroundService.stop();
      });
  });
};

const trackingId = store.getState().storage.walk.trackingId;

export default {
  start: () => BackgroundService.start(backgroundTask, options),
  stop: () =>
    BackgroundService.stop().then(() => {
      if (trackingId) {
        Geolocation.clearWatch(trackingId);
      }
    }),
  isRunning: () => BackgroundService.isRunning(),
};
