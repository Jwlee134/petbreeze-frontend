import React, { useContext, useEffect } from "react";
import { Path as Polyline, Marker } from "react-native-nmap";
import { DimensionsContext } from "~/context/DimensionsContext";
import { WalkContext } from "~/context/WalkContext";
import { delta } from "~/constants";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";

const Path = ({ showEntirePath }: { showEntirePath: boolean }) => {
  const coords = useAppSelector(state => state.storage.walk.coords);
  const { rpWidth } = useContext(DimensionsContext);
  const { mapRef } = useContext(WalkContext);

  useEffect(() => {
    if (!mapRef.current) return;
    // 다른 거 하다가 들어올 시 현재 위치로 화면 이동
    if (coords.length !== 0) {
      // map initialCamera 프로퍼티와 겹치지 않기 위해 setTimeout
      setTimeout(() => {
        mapRef.current?.animateToRegion({
          latitude: coords[coords.length - 1][0],
          longitude: coords[coords.length - 1][1],
          latitudeDelta: delta,
          longitudeDelta: delta,
        });
      }, 500);
    }
  }, [mapRef]);

  useEffect(() => {
    if (!mapRef.current) return;
    // 시작 후 최초 좌표 받을 시 그 좌표로 화면 이동
    if (coords.length === 1) {
      mapRef.current.animateToRegion({
        latitude: coords[0][0],
        longitude: coords[0][1],
        latitudeDelta: delta,
        longitudeDelta: delta,
      });
    }
  }, [mapRef, coords]);

  if (coords.length) {
    return (
      <>
        {!showEntirePath ? (
          <Marker
            coordinate={{
              latitude: coords[coords.length - 1][0],
              longitude: coords[coords.length - 1][1],
            }}
            image={require("~/assets/image/footprint-marker.png")}
            width={rpWidth(41)}
            height={rpWidth(57)}
            anchor={{
              x: 0.5,
              y: 1,
            }}
          />
        ) : (
          <>
            {coords.length > 1 ? (
              <Marker
                coordinate={{ latitude: coords[0][0], longitude: coords[0][1] }}
                image={require("~/assets/image/walk/walk-start.png")}
                width={rpWidth(20)}
                height={rpWidth(20)}
                anchor={{
                  x: 0.5,
                  y: 0.5,
                }}
              />
            ) : null}
            <Marker
              coordinate={{
                latitude: coords[coords.length - 1][0],
                longitude: coords[coords.length - 1][1],
              }}
              image={require("~/assets/image/walk/walk-end.png")}
              width={rpWidth(20)}
              height={rpWidth(20)}
              anchor={{
                x: 0.5,
                y: 0.5,
              }}
            />
          </>
        )}
        {coords.length > 1 && (
          <Polyline
            coordinates={coords.map(coord => ({
              latitude: coord[0],
              longitude: coord[1],
            }))}
            color={palette.blue_7b_80}
            outlineWidth={0}
            width={5}
          />
        )}
      </>
    );
  }

  return null;
};

export default Path;
