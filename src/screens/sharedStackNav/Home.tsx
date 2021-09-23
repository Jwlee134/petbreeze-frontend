import React, { useContext } from "react";
import styled, { css } from "styled-components/native";

import { HomeScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import useMap from "~/hooks/useMap";
import useMyLocation from "~/hooks/useMyLocation";

import { StyleSheet } from "react-native";

import DeviceList from "~/components/home/DeviceList";
import MapFloatingCircle from "~/components/common/MapFloatingCircle";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const CircleContainer = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(80)}px;
    margin-bottom: ${rpWidth(48)}px;
  `}
  align-self: flex-end;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { Map, mapRef } = useMap();
  const { isTracking, startTracking, clearTracking } = useMyLocation();
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <>
      <Container>
        <Map style={StyleSheet.absoluteFill} />
        <DeviceList />
        <CircleContainer rpWidth={rpWidth}>
          <MapFloatingCircle
            style={{ alignSelf: "center", marginBottom: rpWidth(25) }}
          />
          <MapFloatingCircle style={{ alignSelf: "center" }} />
        </CircleContainer>
      </Container>
    </>
  );
};

export default Home;
