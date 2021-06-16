import React, { ReactNode, useCallback, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import MapView, { MapViewProps, PROVIDER_GOOGLE } from "react-native-maps";
import { useAppSelector } from "~/store";

interface IProps extends MapViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const useMap = () => {
  const mapRef = useRef<MapView>(null);
  const camera = useAppSelector(state => state.storage.camera);

  const Map = useCallback(
    ({ children, style, ...props }: IProps) => (
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%", ...(style as object) }}
        provider={PROVIDER_GOOGLE}
        initialCamera={camera}
        {...props}>
        {children ? children : null}
      </MapView>
    ),
    [],
  );

  return { Map, mapRef, camera };
};

export default useMap;
