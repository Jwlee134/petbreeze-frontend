import React from "react";
import MapView, { Camera, Polyline } from "react-native-maps";
import { useDispatch } from "react-redux";
import { IMapProps } from "~/hooks/useMap";
import useReverseGeocoding from "~/hooks/useReverseGeocoding";
import { useAppSelector } from "~/store";
import { storageActions } from "~/store/storage";
import palette from "~/styles/palette";
import Marker from "./Marker";
import FootprintMarker from "~/assets/svg/footprint-marker.svg";

interface IProps {
  Map: ({ children, style, ...props }: IMapProps) => JSX.Element;
  mapRef: React.RefObject<MapView>;
  camera: Camera;
  isTracking: boolean;
}

const HomeMap = ({ Map, mapRef, camera, isTracking }: IProps) => {
  const data = useAppSelector(state => state.device);
  const { myLatitude, myLongitude, showPath } = useAppSelector(
    state => state.map,
  );
  const { getAddress } = useReverseGeocoding();
  const dispatch = useDispatch();

  const selectedDevice = data.filter(device => device.selected)[0];

  return (
    <Map
      initialCamera={camera}
      onRegionChangeComplete={async () => {
        if (!mapRef.current) return;
        const camera = await mapRef.current.getCamera();
        dispatch(storageActions.setCamera(camera));
      }}>
      {isTracking && (
        <Marker
          color="green"
          coordinate={{ latitude: myLatitude, longitude: myLongitude }}
        />
      )}
      {showPath && selectedDevice && (
        <>
          <Polyline
            coordinates={selectedDevice.path.map(data => ({
              latitude: data.latitude,
              longitude: data.longitude,
            }))}
            strokeWidth={2}
            strokeColor={palette.blue_34}
          />
          {selectedDevice.path.map((data, index) => (
            <Marker
              key={index}
              onPress={async e => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                const address = await getAddress(latitude, longitude);
                if (address)
                  console.log(
                    String(data.utc)
                      .substring(0, 4)
                      .replace(/\B(?=(\d{2})+(?!\d))/g, ":"),
                    address,
                  );
              }}
              color="blue"
              coordinate={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}>
              {index === selectedDevice.path.length - 1 && <FootprintMarker />}
            </Marker>
          ))}
        </>
      )}
    </Map>
  );
};

export default HomeMap;
