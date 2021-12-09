import BackgroundService from "react-native-background-actions";
import Geolocation from "react-native-geolocation-service";
import { store } from "~/store";
import { storageActions } from "~/store/storage";
import { getDistanceBetween2Points } from ".";

const options = {
  taskName: "walk",
  taskTitle: "펫브리즈",
  taskDesc: "산책 중입니다.",
  taskIcon: {
    name: "ic_launcher",
    type: "mipmap",
  },
  color: "#ff00ff",
  linkingURI: "petbreeze://walk/map",
};

const stopWatching = () => {
  const { trackingId } = store.getState().storage.walk;
  if (trackingId !== null) {
    Geolocation.clearWatch(trackingId);
    store.dispatch(
      storageActions.setWalk({
        trackingId: null,
      }),
    );
  }
};

const setCoords = () =>
  new Promise<number>((resolve, reject) => {
    const id = Geolocation.watchPosition(
      pos => {
        const { coords } = store.getState().storage.walk;
        const { latitude, longitude } = pos.coords;
        const lat = parseFloat(latitude.toFixed(6));
        const lng = parseFloat(longitude.toFixed(6));

        if (coords.length === 0) {
          store.dispatch(
            storageActions.setCoords({
              latitude: lat,
              longitude: lng,
            }),
          );
        } else {
          const distanceBetweenCoords = getDistanceBetween2Points(
            latitude,
            longitude,
            coords[coords.length - 1][1],
            coords[coords.length - 1][0],
          );
          if (distanceBetweenCoords > 9) {
            store.dispatch(
              storageActions.setCoords({
                latitude: lat,
                longitude: lng,
              }),
            );
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
        enableHighAccuracy: true,
        distanceFilter: 10,
        showsBackgroundLocationIndicator: true,
      },
    );
  });

const backgroundTask = async () => {
  await new Promise<void>(() => {
    setCoords()
      .then(trackingId => {
        stopWatching();
        store.dispatch(
          storageActions.setWalk({
            trackingId,
          }),
        );
      })
      .catch(() => {
        store.dispatch(
          storageActions.setWalk({
            isWalking: false,
          }),
        );
        BackgroundService.stop();
      });
  });
};

export default {
  start: () => BackgroundService.start(backgroundTask, options),
  stop: () =>
    BackgroundService.stop().then(() => {
      stopWatching();
    }),
  isRunning: () => BackgroundService.isRunning(),
};
