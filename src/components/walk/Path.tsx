import React from "react";
import { useEffect } from "react";
import MapView, { Polyline } from "react-native-maps";
import { useDispatch } from "react-redux";
import Marker from "~/components/map/Marker";
import { store, useAppSelector } from "~/store";
import { storageActions } from "~/store/storage";
import palette from "~/styles/palette";
import { getDistanceBetween2Points } from "~/utils";

const Path = ({
  mapRef,
}: //   deviceId,
{
  mapRef: React.RefObject<MapView>;
  //   deviceId: string[];
}) => {
  const coords = useAppSelector(state => state.storage.walk.coords);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mapRef.current) return;
    // 다른 거 하다가 들어올 시 현재 위치로 화면 이동
    if (coords.length !== 0) {
      // map initialCamera 프로퍼티와 겹치지 않기 위해 setTimeout
      setTimeout(() => {
        mapRef.current?.animateCamera({
          center: {
            latitude: coords[coords.length - 1][0],
            longitude: coords[coords.length - 1][1],
          },
          zoom: 18,
        });
      }, 500);
    }
  }, [mapRef]);

  useEffect(() => {
    if (!mapRef.current) return;
    // 시작 후 최초 좌표 받을 시 그 좌표로 화면 이동
    if (coords.length === 1 && !store.getState().storage.walk.startTime) {
      mapRef.current.animateCamera({
        center: {
          latitude: coords[0][0],
          longitude: coords[0][1],
        },
        zoom: 18,
      });
      // dispatch(storageActions.setSelectedDeviceId(deviceId));
      dispatch(storageActions.setStartTime(new Date().toISOString()));
    }
    if (coords.length > 1) {
      const distanceBetweenCoords = getDistanceBetween2Points(
        coords[coords.length - 1][0],
        coords[coords.length - 1][1],
        coords[coords.length - 2][0],
        coords[coords.length - 2][1],
      );
      if (distanceBetweenCoords < 10) {
        dispatch(storageActions.spliceCoords());
      } else {
        dispatch(storageActions.setMeter(Math.round(distanceBetweenCoords)));
      }
    }
  }, [mapRef, coords]);

  return coords.length > 0 ? (
    <>
      <Polyline
        coordinates={coords.map(coord => ({
          latitude: coord[0],
          longitude: coord[1],
        }))}
        strokeWidth={7}
        strokeColor={palette.blue_34}
      />
      <Marker
        coordinate={{
          latitude: coords[coords.length - 1][0],
          longitude: coords[coords.length - 1][1],
        }}
        color="green"
      />
    </>
  ) : null;
};

export default Path;
