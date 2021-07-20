import { useState } from "react";
import { Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { mapActions } from "~/store/map";
import { storageActions } from "~/store/storage";
import { getDistanceBetween2Points } from "~/utils";

const useMyLocation = ({ isWalking = false }: { isWalking?: boolean } = {}) => {
  const coords = useAppSelector(state => state.storage.walk.coords);
  const dispatch = useDispatch();

  const [isTracking, setIsTracking] = useState(false);

  let trackingId = 0;

  const startTracking = () => {
    setIsTracking(true);
    setCoords();
  };

  const clearTracking = () => {
    setIsTracking(false);
    Geolocation.clearWatch(trackingId);
  };

  const setCoords = () => {
    return new Promise<void>((resolve, reject) => {
      trackingId = Geolocation.watchPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          console.log(latitude, longitude);
          if (!isWalking) {
            dispatch(
              mapActions.setMyCoords({
                latitude,
                longitude,
              }),
            );
            resolve();
          } else {
            if (
              coords.length > 0 &&
              getDistanceBetween2Points(
                coords[coords.length - 1][0],
                coords[coords.length - 1][1],
                latitude,
                longitude,
              ) < 10
            ) {
              return resolve();
            }
            dispatch(storageActions.setCoords({ latitude, longitude }));
            resolve();
          }
        },
        error => {
          Alert.alert("위치를 불러올 수 없습니다.");
          reject();
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
        },
      );
    });
  };

  return {
    trackingId,
    isTracking,
    startTracking,
    clearTracking,
    setCoords,
  };
};

export default useMyLocation;
