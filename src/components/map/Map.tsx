import React, { useRef } from "react";
import styled, { css } from "styled-components/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions } from "react-native";

import MyLocationMarker from "./MyLocationMarker";
import HomeToggle from "./HomeToggle";
import useLocationTracking from "~/hooks/useLocationTracking";

const width = Dimensions.get("screen").width;

const Container = styled.View<{ isFullScreen: boolean }>`
  ${({ isFullScreen }) =>
    isFullScreen
      ? css`
          flex: 1;
        `
      : css`
          width: ${width};
          height: ${width};
        `}
`;

interface IProps {
  isFullScreen: boolean;
  isHome?: boolean;
}

const Map = ({ isFullScreen, isHome = false }: IProps) => {
  const mapRef = useRef<MapView>(null);

  const { latitude, longitude, startTracking, clearTracking } =
    useLocationTracking({ mapRef });

  return (
    <Container isFullScreen={isFullScreen}>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.5666805,
          longitude: 126.9784147,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <MyLocationMarker coordinate={{ latitude, longitude }} />
      </MapView>
      {isHome && (
        <HomeToggle
          startTracking={startTracking}
          clearTracking={clearTracking}
        />
      )}
    </Container>
  );
};

export default Map;
