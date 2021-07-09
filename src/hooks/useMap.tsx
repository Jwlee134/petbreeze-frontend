import React, { ReactNode, useCallback, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import MapView, { MapViewProps, PROVIDER_GOOGLE } from "react-native-maps";
import { useAppSelector } from "~/store";

export interface IMapProps extends MapViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const useMap = () => {
  const mapRef = useRef<MapView>(null);
  const camera = useAppSelector(state => state.storage.camera);

  const Map = useCallback(
    ({ children, style, ...props }: IMapProps) => (
      <MapView
        ref={mapRef}
        style={style}
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
